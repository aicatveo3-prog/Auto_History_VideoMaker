#!/usr/bin/env node
// 키워드나 이야기 id 하나로 에피소드 폴더를 만든다: topic.json + research.md + pitches.md(빈 틀)
// 사용법: node tools/new-episode.mjs <이야기 id | 키워드>     예) node tools/new-episode.mjs 녹읍
//        node tools/new-episode.mjs --list 녹읍              (해당 키워드가 들어간 이야기 목록만 보기)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const listOnly = args[0] === '--list';
const query = (listOnly ? args[1] : args[0])?.trim();
if (!query) {
  console.error('사용법: node tools/new-episode.mjs <이야기 id | 키워드>');
  process.exit(1);
}

const data = JSON.parse(readFileSync(join(ROOT, 'data', 'hanneung.json'), 'utf8'));
const bank = JSON.parse(readFileSync(join(ROOT, 'data', 'stories.json'), 'utf8'));
const byKw = new Map(data.entries.map(e => [e.kw, e]));

// 1) id 정확히 일치 → 2) members 에 키워드 포함 → 3) 제목에 포함
let matches = bank.stories.filter(s => s.id === query);
if (!matches.length) matches = bank.stories.filter(s => s.members.includes(query));
if (!matches.length) matches = bank.stories.filter(s => s.title.includes(query) || s.members.some(m => m.includes(query)));

if (listOnly || matches.length > 1) {
  console.log(`'${query}' 이(가) 들어간 이야기 ${matches.length}편:`);
  for (const s of matches) console.log(`  ${s.id.padEnd(24)} ${s.title}`);
  if (!listOnly && matches.length > 1) console.log('\n하나를 골라 id 로 다시 실행하세요.');
  process.exit(0);
}

let story = matches[0];
if (!story) {
  // 이야기 은행에 없는 키워드 → 데이터에서 찾아 1인 이야기 초안 생성
  const e = byKw.get(query) || data.entries.find(x => x.kw.includes(query));
  if (!e) {
    console.error(`'${query}' 를 이야기 은행과 한능검 데이터 어디에서도 찾지 못했습니다.`);
    process.exit(1);
  }
  story = {
    id: `new-${e.year}-${e.id}`, season: '미정', title: `${e.kw} (${e.yearLabel})`,
    conflict: '(기획 ②단계에서 채우기)', hook: '(기획 ⑤단계에서 채우기)', examLine: e.choice,
    members: [e.kw], protagonists: [], tones: [], scores: { drama: 0, visual: 0, feasibility: 0 },
  };
  console.log(`ℹ 이야기 은행에 없는 키워드라 '${e.kw}' 하나로 시작합니다. research.md 를 보고 members 를 늘리세요.`);
}

const members = story.members.map(m => byKw.get(m)).filter(Boolean);
const kings = [...new Set(members.flatMap(e => e.kings))];
const years = members.map(e => e.year);
const from = Math.floor(Math.min(...years)) - 15;
const to = Math.ceil(Math.max(...years)) + 15;
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const anchors = [...new Set([...kings, ...members.map(e => e.answer)])].filter(a => a && !/^\d/.test(a));

const folder = join(ROOT, 'episodes', story.id);
if (existsSync(join(folder, 'topic.json'))) {
  console.error(`이미 있는 에피소드입니다: episodes/${story.id} (topic.json 을 고친 뒤 related.mjs 를 실행하세요)`);
  process.exit(1);
}
mkdirSync(folder, { recursive: true });

const topic = {
  storyId: story.id,
  title: story.title,
  conflict: story.conflict,
  examLine: story.examLine,
  members: story.members,
  keywords: story.members.map(esc),
  exclude: [],
  kings,
  timeline: { from, to, match: anchors.map(esc).join('|') || '.' },
  concepts: [],
  highFrequency: 5,
  facts: [],
  terms: [],
};
writeFileSync(join(folder, 'topic.json'), JSON.stringify(topic, null, 2) + '\n');

const pitch = `# 기획안: ${story.title}

> 기획 규칙: .kiro/steering/planning-framework.md · 보완 리서치: [research.md](./research.md)
> 시점 기획안 4개 이상을 만들고 사용자가 고른다. 고른 안만 script_<안>.md 로 대본화한다.

## ① 소재
- 이야기 id: \`${story.id}\` · 시즌: ${story.season}
- 구성 키워드: ${members.map(e => `${e.kw}(${e.count})`).join(', ')}

## ② 갈등
${story.conflict}

## ③ 핵심 두 줄
- 📖 이야기: 
- 📝 시험: ${story.examLine}

## ④ 시점 기획안 (A~F 중 4개 이상)
| 안 | 시점 | 분위기 | 한 줄 줄거리 | 첫 대사(훅) |
|---|---|---|---|---|

## ⑤ 60초 구조 (안별)

## ⑥ 보완 리서치 반영

## ⑦ 제작 가능성 & 점수
| 안 | 훅 | 감정이입 | 시험 연결 | 제작 쉬움 | 시리즈성 | 합계 |
|---|---|---|---|---|---|---|
`;
writeFileSync(join(folder, 'pitches.md'), pitch);

execFileSync('node', [join(ROOT, 'tools', 'related.mjs'), folder], { stdio: 'inherit' });
console.log(`✅ episodes/${story.id}/ 생성: topic.json, research.md, pitches.md`);
console.log('   다음: topic.json 에 exclude·facts·terms·concepts 를 채우고 related.mjs 재실행 → pitches.md 작성');
