#!/usr/bin/env node
// 한능검 사이트(history-artifact) 데이터를 data/hanneung.json 으로 동기화한다.
// 사용법: node tools/sync-source.mjs
// 1순위: raw.githubusercontent.com 에서 직접 받기 / 2순위: gh CLI (gh api)
import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'aicatveo3-prog/history-artifact';
const BRANCH = 'main';

async function download(file) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${file}`);
    if (res.ok) return await res.text();
    throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.warn(`  raw 다운로드 실패(${e.message}) → gh api 로 재시도: ${file}`);
    return execFileSync('gh', ['api', `repos/${REPO}/contents/${file}`, '-H', 'Accept: application/vnd.github.raw'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  }
}

// HTML 안의 `const NAME = [ ... ];` 배열 리터럴을 잘라낸다 (문자열 안의 괄호는 무시).
function extractArray(html, name) {
  const at = html.indexOf(`const ${name} = `);
  if (at < 0) throw new Error(`${name} 배열을 찾지 못했습니다. 사이트 구조가 바뀌었는지 확인하세요.`);
  const start = html.indexOf('[', at);
  let depth = 0, quote = null, esc = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (quote) {
      if (esc) esc = false; else if (c === '\\') esc = true; else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '[') depth++;
    else if (c === ']' && --depth === 0) {
      const literal = html.slice(start, i + 1);
      try { return JSON.parse(literal); } catch { return new Function(`return ${literal}`)(); }
    }
  }
  throw new Error(`${name} 배열이 닫히지 않았습니다.`);
}

const freqHtml = await download('frequency.html');
const kingsHtml = await download('kings.html');
const DATA = extractArray(freqHtml, 'DATA');
const ITEMS = extractArray(kingsHtml, 'ITEMS');
const KINGS = extractArray(kingsHtml, 'KINGS');

// kings.html 의 ITEMS 는 frequency.html 의 DATA 와 같은 순서 → 인덱스로 왕 정보를 연결한다.
const kingsByIndex = new Map();
for (const k of KINGS) {
  if (k.kd !== 'king') continue;
  for (const idx of [...(k.D || []), ...(k.E || [])]) {
    if (!kingsByIndex.has(idx)) kingsByIndex.set(idx, new Set());
    kingsByIndex.get(idx).add(k.n);
  }
}
const aligned = ITEMS.length === DATA.length && ITEMS.every((x, i) => x.k === DATA[i].kw);
if (!aligned) console.warn('⚠ kings.html 과 frequency.html 의 항목 순서가 달라 왕 연결을 건너뜁니다.');

const entries = DATA.map((e, i) => ({
  id: i,
  kw: e.kw,             // 키워드
  answer: e.ans,        // 정답(시대/왕/인물)
  unit: e.unit,         // 단원
  year: e.sortYear,     // 정렬용 연도
  yearLabel: e.yd || e.yl || '',
  choice: e.c1,         // 시험 선택지 문장
  desc: e.desc,         // 해설
  count: e.cnt,         // 출제 빈도
  source: e.src,        // 기존 / 71~79회 기출 보강
  kings: aligned ? [...(kingsByIndex.get(i) || [])] : [],
}));

const out = {
  source: `https://github.com/${REPO}`,
  site: 'https://aicatveo3-prog.github.io/history-artifact/frequency.html',
  syncedAt: new Date().toISOString(),
  count: entries.length,
  kings: KINGS.filter(k => k.kd === 'king').map(k => ({ name: k.n, state: k.st, from: k.a, to: k.b })),
  entries,
};
mkdirSync(join(ROOT, 'data'), { recursive: true });
writeFileSync(join(ROOT, 'data', 'hanneung.json'), JSON.stringify(out, null, 1));
console.log(`✅ ${entries.length}개 항목, 왕 ${out.kings.length}명 동기화 → data/hanneung.json`);
