#!/usr/bin/env node
// data/stories.json 의 이야기 후보를 한능검 데이터로 검사·채점해 planning/story-bank.md 를 만든다.
// 사용법: node tools/story-bank.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(ROOT, 'data', 'hanneung.json'), 'utf8'));
const bank = JSON.parse(readFileSync(join(ROOT, 'data', 'stories.json'), 'utf8'));
const byKw = new Map(data.entries.map(e => [e.kw, e]));

export function scoreStory(s) {
  const found = s.members.map(m => byKw.get(m)).filter(Boolean);
  const missing = s.members.filter(m => !byKw.has(m));
  const freqSum = found.reduce((n, e) => n + e.count, 0);
  const stars = found.filter(e => e.count >= 5);
  // 수험생 점수: 빈도 합을 로그 척도로 1~5점
  const exam = Math.max(1, Math.min(5, Math.round(Math.log2(freqSum + 1) - 1.5)));
  // 일반 시청자 점수: 갈등 + 장면의 평균
  const general = (s.scores.drama + s.scores.visual) / 2;
  const total = exam + s.scores.drama + s.scores.visual + s.scores.feasibility;
  const years = found.map(e => e.year);
  return { found, missing, freqSum, stars, exam, general, total, from: Math.min(...years), to: Math.max(...years) };
}

const rows = bank.stories.map(s => ({ s, ...scoreStory(s) }));
let problems = 0;
for (const r of rows) if (r.missing.length) {
  problems++;
  console.warn(`⚠ ${r.s.id}: 데이터에 없는 키워드 → ${r.missing.join(', ')}`);
}

const yr = y => (y < 0 ? `기원전 ${-y}` : `${Math.round(y)}`);
const tone = s => s.tones.join('·');
let md = `# 이야기 후보 은행 (${rows.length}편)\n\n`;
md += `> 자동 생성: \`node tools/story-bank.mjs\` · 원본: data/stories.json · 데이터 동기화 ${data.syncedAt.slice(0, 10)}\n>\n`;
md += `> **점수(20점 만점)** = 📝수험(빈출 합, 1~5) + 🔥갈등 + 🎬장면 + 🛠제작 쉬움 · 일반 시청자 점수 = (갈등+장면)/2\n`;
md += `> 새 에피소드 시작: \`node tools/new-episode.mjs <id 또는 키워드>\`\n\n`;

md += `## 🏆 전체 순위 TOP 20\n\n| 순위 | id | 제목 | 시즌 | 점수 | 📝 | 🔥 | 🎬 | 🛠 | 빈출 합 | ⭐키워드 |\n|---|---|---|---|---|---|---|---|---|---|---|\n`;
[...rows].sort((a, b) => b.total - a.total || b.freqSum - a.freqSum).slice(0, 20).forEach((r, i) => {
  md += `| ${i + 1} | \`${r.s.id}\` | ${r.s.title} | ${r.s.season} | **${r.total}** | ${r.exam} | ${r.s.scores.drama} | ${r.s.scores.visual} | ${r.s.scores.feasibility} | ${r.freqSum} | ${r.stars.map(e => e.kw).join(', ')} |\n`;
});

md += `\n## 📚 시즌별 전체 목록\n`;
for (const [sid, sname] of Object.entries(bank.seasons)) {
  const list = rows.filter(r => r.s.season === sid).sort((a, b) => a.from - b.from);
  if (!list.length) continue;
  const sum = list.reduce((n, r) => n + r.freqSum, 0);
  md += `\n### ${sid}. ${sname} — ${list.length}편 · 빈출 합 ${sum}\n`;
  for (const r of list) {
    const s = r.s;
    md += `\n#### \`${s.id}\` ${s.title}  (점수 ${r.total} · ${yr(r.from)}~${yr(r.to)})\n`;
    md += `- **갈등**: ${s.conflict}\n`;
    md += `- **훅**: "${s.hook}"\n`;
    md += `- **시험 한 줄**: ${s.examLine}\n`;
    md += `- **주인공 후보**: ${s.protagonists.join(' / ')} · **분위기**: ${tone(s)}\n`;
    md += `- **키워드(${r.found.length})**: ${r.found.map(e => (e.count >= 5 ? `⭐${e.kw}(${e.count})` : `${e.kw}(${e.count})`)).join(', ')}\n`;
    if (s.note) md += `- 💡 ${s.note}\n`;
    if (s.caution) md += `- ⚠ ${s.caution}\n`;
    if (r.missing.length) md += `- ❌ 데이터에 없는 키워드: ${r.missing.join(', ')}\n`;
  }
}

// 어떤 이야기에도 안 들어간 빈출 키워드 → 새 이야기 후보
const used = new Set(rows.flatMap(r => r.found.map(e => e.kw)));
const orphans = data.entries.filter(e => e.count >= 6 && !used.has(e.kw)).sort((a, b) => b.count - a.count);
md += `\n## 🧩 아직 이야기에 안 들어간 빈출 키워드 (6회 이상, ${orphans.length}개)\n\n`;
md += orphans.length
  ? orphans.map(e => `${e.kw}(${e.count}·${e.unit}·${e.answer})`).join(', ') + '\n'
  : '없음\n';

mkdirSync(join(ROOT, 'planning'), { recursive: true });
writeFileSync(join(ROOT, 'planning', 'story-bank.md'), md);
console.log(`✅ 이야기 ${rows.length}편 채점 · 키워드 오류 ${problems}편 · 미배정 빈출 ${orphans.length}개 → planning/story-bank.md`);
