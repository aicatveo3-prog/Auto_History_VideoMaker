# Auto_History_VideoMaker

역사 콘텐츠 영상 자동 제작 파이프라인 (프로젝트 진행 중)

한능검 빈출 키워드로 한국사 쇼츠(실사풍 AI 사극)를 기획·제작합니다. 수험생과 일반 시청자를 함께 잡는 것이 목표예요.

## 계획
- 주제 수집 및 대본 자동 생성 ✅ 기획 시스템 구축 (이 저장소)
- 이미지/영상 소스 생성 (Google Flow 연동) — 나노바나나 + Veo 3.1 프롬프트 작성 완료 (파일럿 1편)
- TTS 내레이션 및 자막
- 최종 영상 렌더링

## 작업 흐름
```
키워드 또는 이야기 id 하나
  → ① 소재  ② 갈등  ③ 핵심 두 줄  ④ 시점 기획안 4개 이상  ⑤ 60초 구조  ⑥ 보완 리서치  ⑦ 점수
  → 사용자가 안 선택 → script_<안>.md (대본)
  → direction.md (연출: 감독 스타일 1개, 컷 목록, 일관성 규칙, 사운드, 편집)
  → prompts.md (나노바나나 키프레임 + 영상 프롬프트) → 생성 → qc-log.md
```
규칙: `.kiro/steering/planning-framework.md` (기획), `.kiro/steering/research-enrichment.md` (보완 리서치), `.kiro/steering/skill-strategy.md` (연출 스킬 사용법)
외부 스킬: `.kiro/skills/` (각본 8개, cinematic-director, image, video · 출처 `.kiro/skills/ATTRIBUTION.md`)

## 구조
```
data/
  hanneung.json    한능검 사이트 데이터 (1,101개 항목 + 왕 연결, 자동 동기화)
  stories.json     이야기(갈등) 후보 89편
  glossary.json    용어 한 줄 풀이
  concepts.json    시대를 넘나드는 개념 묶음
  site-gaps.md     사이트에 없어 보강이 필요한 사실
planning/
  story-bank.md    이야기 후보 전체 목록 + 점수 순위 (자동 생성)
  README.md        시즌 로드맵, 파일럿 10편 안
characters/        고정 캐릭터·세트 프롬프트
episodes/<id>/
  topic.json       주제 설정
  research.md      보완 리서치 (자동 생성)
  pitches.md       시점별 기획안과 점수
  script_<안>.md   고른 안의 대본
  direction.md     연출 계획
  prompts.md       이미지·영상 프롬프트
  qc-log.md        생성 결과 점검표
tools/
  sync-source.mjs  사이트 데이터 동기화
  story-bank.mjs   이야기 후보 검사·채점
  new-episode.mjs  키워드/id로 에피소드 폴더 생성
  related.mjs      관련 항목 찾기 → research.md
```

## 파일럿 에피소드
`episodes/s1-nogeup-war/` 「이 땅이… 진짜 제 땅입니까?」 — 녹읍 전쟁, 농부 시점(A안), 말릭 스타일, 16컷 약 59초

## 명령어 (Node.js 18 이상)
```bash
node tools/sync-source.mjs                  # 사이트 데이터 최신화
node tools/story-bank.mjs                   # 이야기 후보 검사·순위 갱신
node tools/new-episode.mjs --list 녹읍       # 키워드가 들어간 이야기 찾기
node tools/new-episode.mjs s1-sinmun        # 에피소드 폴더 만들기
node tools/related.mjs episodes/s1-sinmun   # topic.json 수정 후 리서치 다시 만들기
```
