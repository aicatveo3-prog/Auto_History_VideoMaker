#!/usr/bin/env node
// 에피소드 주제(topic.json)를 기준으로 한능검 데이터에서 관련 항목을 찾아 research.md 를 만든다.
// 사용법: node tools/related.mjs episodes/<에피소드폴더>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const epDir = process.argv[2] && resolve(process.argv[2]);
if (!epDir || !existsSync(join(epDir, 'topic.json'))) {
  console.error('사용법: node tools/related.mjs episodes/<에피소드폴더>  (폴더 안에 topic.json 필요)');
  process.exit(1);
}
const dataPath = join(ROOT, 'data', 'hanneung.json');
if (!existsSync(dataPath)) {
  console.error('data/hanneung.json 이 없습니다. 먼저 node tools/sync-source.mjs 를 실행하세요.');
  process.exit(1);
}

const topic = JSON.parse(readFileSync(join(epDir, 'topic.json'), 'utf8'));
const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const glossary = JSON.parse(readFileSync(join(ROOT, 'data', 'glossary.json'), 'utf8')).terms;
const concepts = JSON.parse(readFileSync(join(ROOT, 'data', 'concepts.json'), 'utf8')).groups;

const E = data.entries;
const text = e => `${e.kw} ${e.answer} ${e.choice} ${e.desc}`;
const exclude = (topic.exclude || []).map(s => new RegExp(s));
const isExcluded = e => exclude.some(re => re.test(text(e)));
const HIGH = topic.highFrequency ?? 5;

const placed = new Map(); // id -> 처음 배정된 구분 (중복 표시 방지)
const tiers = [];
function tier(name, why, list) {
  const rows = list.filter(e => !placed.has(e.id)).sort((a, b) => b.count - a.count || a.year - b.year);
  rows.forEach(e => placed.set(e.id, name));
  tiers.push({ name, why, rows });
}

// ⓪ 이야기 구성 키워드 (stories.json 의 members)
if (topic.members?.length) {
  const miss = topic.members.filter(m => !E.some(e => e.kw === m));
  if (miss.length) console.warn(`⚠ members 중 데이터에 없는 키워드: ${miss.join(', ')}`);
  tier('⓪ 이야기 구성 키워드', '이 이야기의 뼈대로 정한 키워드', E.filter(e => topic.members.includes(e.kw)));
}

// ① 직접 관련: 키워드가 선택지/해설에 등장
const kwRes = (topic.keywords || []).map(s => new RegExp(s));
const direct = E.filter(e => kwRes.some(re => re.test(text(e))));
const excludedHits = direct.filter(isExcluded);
tier('① 직접 관련', '주제 키워드가 선택지·해설에 나옴', direct.filter(e => !isExcluded(e)));

// ② 같은 왕
tier('② 같은 왕의 다른 업적·문화유산', `${(topic.kings || []).join(', ')} 와 연결된 항목`,
  E.filter(e => e.kings.some(k => (topic.kings || []).includes(k)) && !isExcluded(e)));

// ③ 앞뒤 흐름 (연표)
if (topic.timeline) {
  const { from, to, match } = topic.timeline;
  const re = new RegExp(match);
  tier('③ 앞뒤 흐름 (연표)', `${from}~${to}년, 같은 나라·시기`,
    E.filter(e => e.year >= from && e.year <= to && re.test(`${text(e)} ${e.kings.join(' ')}`) && !isExcluded(e)));
}

// ④ 개념 묶음 (시대 넘나드는 비교)
const conceptRows = [];
for (const g of topic.concepts || []) {
  const group = concepts[g];
  if (!group) { console.warn(`⚠ concepts.json 에 '${g}' 묶음이 없습니다.`); continue; }
  const missing = group.members.filter(m => !E.some(e => e.kw === m));
  if (missing.length) console.warn(`⚠ '${g}' 묶음의 키워드가 데이터에 없음: ${missing.join(', ')}`);
  conceptRows.push(...E.filter(e => group.members.includes(e.kw)));
}
tier('④ 개념 비교 (시대 넘나듦)', (topic.concepts || []).join(', '), conceptRows);

// ⑤ 사실 확인: 대본에 쓰는 사실이 사이트 데이터에 있는지
const facts = (topic.facts || []).map(f => {
  const re = new RegExp(f.query);
  const hits = E.filter(e => re.test(text(e)) && !isExcluded(e));
  return { ...f, hits };
});

// ⑥ 용어 풀이
const terms = (topic.terms || []).map(t => ({ t, g: glossary[t] }));

// ---------- research.md 작성 ----------
const row = e => {
  const star = e.count >= HIGH ? '⭐ ' : '';
  const boost = e.source && e.source !== '기존' ? ` · 🆕${e.source}` : '';
  return `| ${star}${e.kw} | ${e.yearLabel || e.year} | ${e.answer} | ${e.count}회${boost} | ${e.choice} |`;
};
let md = `# 보완 리서치: ${topic.title}\n\n`;
md += `> 자동 생성 파일입니다 (\`node tools/related.mjs ${process.argv[2]}\`). 직접 고치지 말고 topic.json 을 고친 뒤 다시 실행하세요.\n`;
md += `> 데이터: [한능검 빈출 선택지](${data.site}) · 동기화 ${data.syncedAt.slice(0, 10)} · ⭐ = ${HIGH}회 이상 빈출\n\n`;

for (const t of tiers) {
  md += `## ${t.name}\n_${t.why}_ — ${t.rows.length}개\n\n`;
  if (!t.rows.length) { md += '없음\n\n'; continue; }
  md += '| 키워드 | 연도 | 정답 | 빈도 | 선택지 |\n|---|---|---|---|---|\n';
  md += t.rows.map(row).join('\n') + '\n\n';
}

if (topic.concepts?.length) {
  md += '### 개념 흐름 (한 줄)\n';
  for (const g of topic.concepts) if (concepts[g]) md += `- **${g}**: ${concepts[g].flow}\n`;
  md += '\n';
}

md += '## ⑤ 사실 확인 (대본에 쓰는 사실 ↔ 사이트 데이터)\n\n| 사실 | 데이터 | 근거 항목 |\n|---|---|---|\n';
for (const f of facts) {
  md += f.hits.length
    ? `| ${f.label} | ✅ 있음 | ${f.hits.slice(0, 3).map(e => `${e.kw}(${e.yearLabel})`).join(', ')} |\n`
    : `| ${f.label} | ⚠ 없음 | 외부 사료로 확인 필요 · **사이트 보강 후보** |\n`;
}
md += '\n## ⑥ 용어 풀이 (glossary.json)\n\n';
for (const { t, g } of terms) {
  md += g ? `- **${t}**: ${g.short}\n` : `- **${t}**: ⚠ 풀이 없음 → data/glossary.json 에 추가하세요\n`;
}

if (excludedHits.length) {
  md += '\n## 🚫 제외한 동음이의 항목\n';
  md += excludedHits.map(e => `- ${e.kw} (${e.yearLabel}) — ${e.choice}`).join('\n') + '\n';
}

md += `\n## ✍ 반영 결정 (사람/AI가 채우기)\n\n| 항목 | 반영 수준 | 위치 | 메모 |\n|---|---|---|---|\n`;
md += '| | 본편 / 자막 한 줄 / 화면 소재 / 고정댓글·설명란 / 다음 편 / 제외 | | |\n';

writeFileSync(join(epDir, 'research.md'), md);
const total = tiers.reduce((n, t) => n + t.rows.length, 0);
const missingFacts = facts.filter(f => !f.hits.length).length;
const missingTerms = terms.filter(x => !x.g).length;
console.log(`✅ 관련 항목 ${total}개 · 데이터에 없는 사실 ${missingFacts}개 · 풀이 없는 용어 ${missingTerms}개 → ${join(process.argv[2], 'research.md')}`);
