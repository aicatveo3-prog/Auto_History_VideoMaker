# 「이 땅이… 진짜 제 땅입니까?」 제작 대본 v2 (A안 확정)

> ⚠ **v3(말릭 렌즈)로 대체됨:** 컷 구성과 프롬프트는 [direction.md](./direction.md)와 [prompts.md](./prompts.md)를 따르세요. 이 문서는 이야기·사실 확인·업로드 정보 참고용입니다.

- 이야기: `s1-nogeup-war` 녹읍 전쟁 · 시점 A(농부) · 분위기: 감동 사극
- 길이 약 62초 (60초 안으로 맞추려면 C05 생략) · 9:16 · 1080×1920 · 30fps
- ⚠ 두지 가족, 김 대아찬 가문, 집사, 관리, 모든 대사는 **각색**입니다. 연도와 제도는 『삼국사기』와 교과서 기준입니다.

---

## 0. v1에서 바뀐 점
1. **연도 오류 수정:** 녹읍에 시달리던 때(681)와 정전을 받은 때(722)는 41년 차이가 나서, 같은 30대 농부일 수 없어요.
   → **6살 두지가 아버지의 고생을 지켜보고, 47살이 되어 정전을 받는** 구조로 바꿨어요. 감정선도 더 강해졌습니다 ("아버지… 보고 계십니까").
2. **757년 장면 수정:** 김 대아찬 본인이 아니라 **손자**가 녹읍을 되찾아요. 본인이 살아 있기에는 68년이 너무 길어요.
3. **컷 16개로 세분화:** 컷마다 3~6초라 쇼츠 템포에 맞아요.
4. **얼굴 재사용:** 두지 / 아버지 / 어린 두지는 한 집안 얼굴, 김 대아찬 / 손자도 한 얼굴로 만들어요. 새로 만들 얼굴은 5개뿐이에요.
5. **색으로 시간 구분:** 과거(681)는 차갑고 탁한 회청색, 현재(722)는 따뜻한 황금빛, 757년은 어두운 촛불빛이에요.

---

## 1. 스타일 문구 (모든 키프레임 프롬프트 끝에 붙이기)
- **[PAST]** `cinematic Korean historical drama still, Unified Silla dynasty 681 AD, overcast cold blue-gray color grade, muted desaturated tones, film grain, shallow depth of field, photorealistic, vertical 9:16, no text, no watermark`
- **[PRESENT]** `cinematic Korean historical drama still, Unified Silla dynasty 722 AD, warm golden-hour sunlight, rich warm amber tones, film grain, shallow depth of field, photorealistic, vertical 9:16, no text, no watermark`
- **[DARK]** `cinematic Korean historical drama still, Unified Silla dynasty 757 AD, low-key lighting, single candle, deep shadows, ominous mood, film grain, photorealistic, vertical 9:16, no text, no watermark`

**레퍼런스 첨부 문구** (프롬프트 맨 앞): `Use the attached reference images. Keep each character's face, hairstyle and clothing exactly identical to their reference sheet.`
**💡 팁:** 한 번에 넣는 레퍼런스는 3장 이내가 가장 안정적이에요. 인물이 셋 이상이면 주요 인물 2명 + 장소 1장을 넣고, 나머지 인물은 작게 넣거나 뒷모습으로 처리하세요.

---

## 2. 캐릭터 시트 (나노바나나로 먼저 생성)

공통 앞부분: `Character reference sheet on a plain light gray background: front view, three-quarter view, side profile, and full-body view of the same person. Photorealistic, cinematic soft lighting, Korean historical drama, Unified Silla dynasty (8th century).`

| id | 인물 | 프롬프트 (공통 앞부분 뒤에 붙이기) | 만드는 방법 |
|---|---|---|---|
| `duji` | **두지** (47세, 722년) | `A Korean peasant man aged 47, lean and wiry, deeply sunburnt skin, weathered kind face with crow's feet, short sparse beard, hair tied in a simple topknot wrapped with a faded brown cloth headband. Coarse undyed hemp jacket tied at the side, loose hemp trousers bound at the ankles, straw sandals. Rough calloused hands.` | 새로 생성 (기준 얼굴 ①) |
| `duji-father` | **두지 아버지** (35세, 681년) | `This man is Duji's father: same family face, eyes and nose as the attached Duji sheet, but aged 35, thinner and exhausted, hollow cheeks, no headband, messy topknot, torn and patched mud-stained hemp clothes, barefoot.` | 두지 시트 첨부 |
| `duji-child` | **어린 두지** (6세, 681년) | `This boy is Duji as a child: same eyes and face shape as the attached Duji sheet, aged 6, thin, short messy hair half tied, oversized patched hemp clothes, barefoot.` | 두지 시트 첨부 |
| `kim` | **김 대아찬** (55세, 진골, 681년) | `A Korean aristocrat aged 55, plump with a double chin, thin mustache, arrogant half-smile, luxurious deep purple silk round-collar official robe (danryeong) with a gold-ornamented belt, black bokdu hat with stiff side wings, jade ring.` | 새로 생성 (기준 얼굴 ②) |
| `kim-grandson` | **김 대아찬의 손자** (40세, 757년) | `This man is the grandson of the attached aristocrat: same family face but aged 40, leaner, colder sharper eyes, same deep purple silk robe and black bokdu hat.` | 김 대아찬 시트 첨부 |
| `steward` | **집사** (45세) | `A sharp-eyed lean Korean man aged 45, thin lips, dark indigo hemp robe with a black sash, hair in a topknot under a black cloth cap, holding a wooden tally board and a thin stick.` | 새로 생성 (기준 얼굴 ③) |
| `seongdeok` | **성덕왕** (40대) | `A dignified Korean king in his 40s, calm resolute face, neatly trimmed beard, Tang-influenced crimson royal robe with gold embroidery, black royal headdress with gold ornaments.` | 새로 생성 (기준 얼굴 ④) |
| `official` | **지방 관리** (30대) | `A neat young Korean government official in his 30s, earnest face, blue round-collar official robe, black bokdu hat, holding a rolled paper document.` | 새로 생성 (기준 얼굴 ⑤) |
| — | **신문왕** | 시트 없음. 뒷모습과 실루엣으로만 등장 (C09) | — |

**🎨 고증 포인트:**
- 신라 관복은 관등에 따라 색이 정해져 있었어요. **자색(보라)은 대아찬 이상**, 비색(붉은색)은 아찬~급찬, 청색은 대나마·나마, 황색은 그 아래예요. 그래서 김 대아찬은 보라, 하급 관리는 파랑으로 했어요.
- 통일신라 왕은 당나라풍 복식이에요. 화려한 출(出)자 모양 금관은 5~6세기 유물이라 **쓰지 않아요.**

---

## 3. 장소 레퍼런스

| id | 장소 | 프롬프트 |
|---|---|---|
| `L1-681` | 마을과 논 (과거) | `A poor Unified Silla farming village in late autumn: thatched-roof huts with mud walls, muddy paths, harvested rice paddies, low mountains behind, overcast sky. Wide establishing shot.` + [PAST] |
| `L1-722` | 같은 마을 (현재) | L1-681 이미지를 첨부하고: `Same village and same mountains, but 41 years later at golden hour: rice paddies full of ripe golden rice, repaired huts.` + [PRESENT] |
| `L2` | 귀족 저택 | `A grand Unified Silla aristocrat's mansion: tiled roofs with curved eaves, stone foundations, wide courtyard, high earthen wall partly under construction.` + [PAST] |
| `L3` | 궁궐 편전 | `Interior of a Unified Silla royal palace hall: massive red wooden pillars, Tang-influenced architecture, stone floor, folding screens, candles and bronze lamps.` |
| `L4` | 나라 창고 | `A Unified Silla government granary: raised wooden storehouses on stilts, stacked rice sacks, a royal banner on a tall pole.` + [PRESENT] |

---

## 4. 컷별 제작표

> 🗣 = 입 모양을 맞춰야 하는 대사 컷 · 🎙 = 내레이션만 · 영상은 5초로 생성한 뒤 편집에서 자르기

### C01 · 0:00~0:03 · 훅 🗣
- **대사:** 두지 (떨리는 저음, 울음을 참으며) "이 땅이… 진짜 제 땅입니까?"
- **자막:** 이 땅이… 진짜 제 땅입니까? / 오른쪽 위에 작게 `722년 · 신라`
- **키프레임** (레퍼런스: duji, L1-722): `Close-up of Duji's rough calloused trembling hands holding an unrolled paper land document with illegible brush calligraphy; his tearful face slightly out of focus above; golden rice paddy behind.` + [PRESENT]
- **영상:** `Slow push-in from his hands up to his face. His lips tremble as he speaks softly; a single tear falls. Rice stalks sway gently in the wind.`
- **효과음:** 바람 소리, 볏잎 스치는 소리

### C02 · 0:03~0:05 · 과거로 🎙
- **내레이션:** "이 농부에겐, 잊을 수 없는 기억이 있었어요."
- **자막:** `681년` 도장이 쾅 찍힘
- **화면:** C01 마지막 프레임에서 두지가 눈을 감음 → 편집에서 먹물이 번지는 전환 효과 → 차가운 색으로 바뀜 (새로 생성할 필요 없음)
- **효과음:** 낮은 '우웅' 소리 + 먹물이 번지는 '스윽' 소리

### C03 · 0:05~0:08 · 골품제 🎙
- **내레이션:** "신라는 핏줄로 신분을 나눴어요. 골품제!"
- **자막:** **골품제** = 핏줄로 신분을 나눈 제도
- **키프레임:** `A vast stone staircase rising into mist in front of a Silla palace. People stand on the steps by rank: at the very top a royal figure in white and gold, below him nobles in deep purple silk robes, then officials in red, then blue, then yellow robes, and commoners in plain hemp at the bottom. Dramatic low angle from the bottom of the stairs.` + [PAST]
- **영상:** `Camera slowly tilts up the staircase from the commoners to the top.`
- 💡 계단의 옷 색(보라 → 빨강 → 파랑 → 노랑 → 삼베)이 실제 신라 관복 색 순서예요.

### C04 · 0:08~0:13 · 성골에서 진골로 🎙
- **내레이션:** "성골이 진덕 여왕을 끝으로 끊기자, 진골이 왕위와 높은 벼슬을 차지했죠."
- **자막:** **성골** = 왕이 될 수 있던 최고 혈통 (진덕 여왕까지) → **진골** = 왕족·최고 귀족 (무열왕부터 왕위)
- **키프레임:** C03 이미지를 첨부하고 끝 프레임을 생성: `Same staircase; the top step is now empty mist, and the purple-robed nobles stand on the top steps.`
- **영상** (C03 마지막을 시작 프레임, 위 이미지를 끝 프레임으로 지정): `The royal figure at the top dissolves into mist; the purple-robed nobles climb up and take the top steps.`

### C05 · 0:13~0:16 · 진골의 힘 🎙 (60초를 맞추려면 이 컷 생략)
- **내레이션:** "진골 귀족은 화백 회의로 나랏일까지 좌우했어요."
- **자막:** **화백 회의** = 진골 대표들이 만장일치로 결정
- **키프레임** (레퍼런스: kim, L2): `Lavish banquet in the aristocrat's mansion hall: Kim Daeachan laughing with a gold cup among other nobles in purple robes, servants pouring wine, low tables with abundant food.` + [PAST]
- **영상:** `Camera glides past servants toward Kim Daeachan; he raises his cup and laughs.`
- **효과음:** 연회장 웅성거림, 잔 부딪히는 소리

### C06 · 0:16~0:20 · 녹읍이란? 🎙
- **내레이션:** "나라는 이들에게 월급 대신, 고을을 통째로 줬어요. 녹읍!"
- **자막:** **녹읍(祿邑)** = 월급 대신 '고을'을 줌 → 곡식(세금) + 백성의 노동력
- **키프레임:** `Top-down view of a hand-drawn ink map of villages on aged hanji paper; a plump hand with a jade ring presses a red seal onto one village.` + [PAST]
- **영상** (끝 프레임 = L1-681): `The seal presses down, red ink spreads over the village; the camera dives into the map and transitions into the real village from above.`
- **효과음:** 도장 '쿵' 소리

### C07 · 0:20~0:24 · 곡식을 빼앗기다 🗣
- **대사:** 집사 (날카롭게 호통) "올해 곡식이다! 대아찬 나리 몫이니, 한 톨도 빼먹지 마라!"
- **자막:** 녹읍 ① 곡식(세금) 🌾
- **키프레임** (레퍼런스: steward, duji-father, L1-681): `In front of a thatched hut, the steward yanks a straw sack of rice from Duji's father, who reaches out desperately. In the background, a small boy (young Duji) peeks frightened from behind the wooden door.` + [PAST]
- **영상:** `The steward yanks the sack away and shouts angrily; the father stumbles forward with his hand outstretched; the boy hides behind the door.`
- **효과음:** 자루 끌리는 소리
- 💡 어린 두지는 작게, 문 뒤에 반쯤 가려지게 넣으면 레퍼런스 없이도 괜찮아요.

### C08 · 0:24~0:29 · 노동력까지 🗣
- **대사:**
  - 집사 (화면 밖 목소리) "내일부터 나리 댁 담장 쌓는다. 장정은 전부 나와!"
  - 아버지 (등을 돌린 채, 한숨 섞인 혼잣말) "우리 논은… 언제 가누…"
- **자막:** 녹읍 ② 백성의 **노동력**까지 💪
- **키프레임** (레퍼런스: duji-father, duji-child, L2): `Exhausted peasant men carrying heavy stones to build the mansion's earthen wall. Duji's father, seen from behind and in profile, carries a large stone on his back; young Duji brings him a small water gourd.` + [PAST]
- **영상:** `The father lifts the heavy stone with strain, sweat dripping; he turns his head toward the distant fields; the boy holds up the gourd.`
- 💡 아버지가 등을 돌리고 있어서 **입 모양을 맞추지 않아도 돼요.**

### C09 · 0:29~0:35 · 신문왕의 개혁 🎙
- **내레이션:** "그해 신문왕은 장인 김흠돌의 반란을 누르고, 687년 관료전을 주더니, 689년 녹읍을 없앱니다."
- **자막:** `681` 김흠돌의 난 진압 → `687` 관료전 지급 (세금만) → `689` 녹읍 폐지 ❌
- **키프레임** (레퍼런스: L3, kim): `Wide shot from behind a young king seated on a throne in a dim palace hall (only his back and silhouette visible). A scroll listing noble estates lies thrown on the stone floor in front of him; nobles in purple robes, including Kim Daeachan, kneel with pale faces; armored guards line the pillars.` + [PAST]
- **영상:** `The scroll hits the floor and unrolls; the kneeling nobles exchange shocked glances; slow dolly forward.`
- **효과음:** 두루마리 떨어지는 소리, 낮은 북소리 두 번

### C10 · 0:35~0:38 · 세월이 흘러 🎙
- **내레이션:** "그리고 세월이 흘러, 722년."
- **자막:** `722년` 도장이 쾅 찍힘
- **시작 프레임** (레퍼런스: duji-child, L1-681): `Young Duji standing alone at the edge of an empty muddy field, looking at the horizon, back three-quarter view.` + [PAST]
- **끝 프레임** (레퍼런스: duji, L1-722): `Adult Duji standing at exactly the same spot and pose, looking at the same horizon over ripe golden rice.` + [PRESENT]
- **영상** (시작·끝 프레임 지정): `Time-lapse: seasons pass rapidly, clouds rush by, the field turns green then golden; the boy grows into a man in the same pose. Color shifts from cold gray to warm gold.`
- **BGM:** 이 컷에서 슬픈 해금 소리가 따뜻한 현악으로 바뀌어요.

### C11 · 0:38~0:42 · 성덕왕의 결심 🗣
- **대사:** 성덕왕 (낮고 단단하게) "백성이 짓는 땅은, 나라가 직접 챙겨야 한다."
- **자막:** 성덕왕 21년 · **722년**
- **키프레임** (레퍼런스: seongdeok, L3): `King Seongdeok at a low desk reviewing thick land registers by candlelight, determined expression; two ministers standing behind him.` + [PRESENT] (실내라 촛불의 따뜻한 빛)
- **영상:** `He closes the register firmly, looks up and speaks with resolve; the candle flame flickers.`

### C12 · 0:42~0:46 · 정전 지급 🗣
- **대사:** 관리 (또박또박, 따뜻하게) "나라에서 내리는 정전이다. 이 땅은 이제, 네가 갈아라."
- **자막:** **정전(丁田)** 지급
- **키프레임** (레퍼런스: official, duji, L1-722): `Wide shot at the edge of the golden rice paddy: the official holds out a rolled document with both hands; Duji, stunned, bows deeply to receive it; villagers watch in the background.` + [PRESENT]
- **영상:** `The official hands over the document and speaks; Duji bows deeply and receives it with both trembling hands.`

### C13 · 0:46~0:49 · 아버지… 🎙 (속삭임, 입 모양 불필요)
- **대사:** 두지 (고개를 숙인 채 속삭이듯) "아버지… 보고 계십니까."
- **자막:** 아버지… 보고 계십니까.
- **키프레임** (레퍼런스: duji, L1-722): `Duji kneeling in his field, head bowed so his face is hidden, grasping a handful of dark soil, the land document tucked against his chest; golden backlight.` + [PRESENT]
- **영상:** `He slowly squeezes the soil in his hand; his shoulders shake; the wind blows through the rice.`
- **BGM:** 이 컷에서 음악이 가장 크게 올라가요.

### C14 · 0:49~0:54 · 정전의 뜻과 목적 🎙
- **내레이션:** "정은 성인 남자. 땅 없는 백성엔 땅을, 짓던 땅은 나라가 인정! 세금은 나라로, 왕권은 더 강하게."
- **자막:**
  - 丁(정) = **성인 남자**
  - 땅 지급 + 국가 공인
  - 토지 → 세금 → 👑 **왕권 강화**
- **14a (2.5초) 키프레임:** `Montage shot: several different peasant men receiving documents and plowing their own fields with oxen, smiling.` + [PRESENT]
- **14b (2.5초) 키프레임** (레퍼런스: duji, L4): `Duji carries a rice sack into a government granary; in the foreground a brush writes in a ledger listing households, fields and cattle; a royal banner flies above.` + [PRESENT]
- **영상 (14b):** `Close-up of the brush writing, then tilt up past the rice sacks to the royal banner waving.`
- ⚠ 장부는 신라 촌락 문서(인구, 토지, 소·말·나무 수를 기록)를 참고해 디자인했어요. 다만 촌락 문서는 722년보다 뒤에 만들어진 것이라, 자막에 문서 이름은 넣지 마세요.

### C15 · 0:54~0:58 · 반전: 녹읍 부활 🗣
- **대사:** 손자 (낮게, 섬뜩하게) "할아버지의 고을이… 돌아왔다."
- **내레이션:** "757년, 경덕왕 때 녹읍이 부활합니다."
- **자막:** `757` 경덕왕 · 녹읍 **부활** 🔥
- **키프레임** (레퍼런스: kim-grandson): `Dim room lit by a single candle: Kim Daeachan's grandson holds up the same red village seal and smiles coldly; the old ink map is spread on the table.` + [DARK]
- **영상:** `Slow push-in to his face as he raises the seal and speaks quietly; the candle flame bends.`
- **효과음:** 낮은 북소리 하나, BGM 끊김

### C16 · 0:58~1:02 · 시험 정리 + 반복 재생 🎙
- **내레이션:** "관료전은 신문왕, 정전은 성덕왕, 녹읍 부활은 경덕왕! 저장해 두세요."
- **화면:** C15 마지막 프레임을 어둡게 하고 그 위에 정리 카드
  ```
  681  김흠돌의 난 진압 ─┐
  687  관료전 지급      ├ 신문왕
  689  녹읍 폐지        ─┘
  722  정전 지급         성덕왕
  757  녹읍 부활         경덕왕
  ```
- **마지막 0.5초:** 황금빛 논을 바라보는 두지의 뒷모습. C01 배경과 같아서 처음으로 자연스럽게 이어져요.

---

## 5. 녹음 대본 (TTS·성우용)

| 역할 | 목소리 지시 | 대사 |
|---|---|---|
| 두지 | 40대 후반 남성, 떨리는 저음 | "이 땅이… 진짜 제 땅입니까?" / (속삭임) "아버지… 보고 계십니까." |
| 아버지 | 30대 남성, 지치고 쉰 목소리 | "우리 논은… 언제 가누…" |
| 집사 | 40대 남성, 날카로운 호통 | "올해 곡식이다! 대아찬 나리 몫이니, 한 톨도 빼먹지 마라!" / "내일부터 나리 댁 담장 쌓는다. 장정은 전부 나와!" |
| 성덕왕 | 40대 남성, 낮고 단단하게 | "백성이 짓는 땅은, 나라가 직접 챙겨야 한다." |
| 관리 | 30대 남성, 또박또박 따뜻하게 | "나라에서 내리는 정전이다. 이 땅은 이제, 네가 갈아라." |
| 손자 | 40대 남성, 낮고 섬뜩한 속삭임 | "할아버지의 고을이… 돌아왔다." |
| 내레이터 | 30대, 밝고 또렷하게, 1.1배속 | 아래 전문 |

**내레이션 전문**
> 이 농부에겐, 잊을 수 없는 기억이 있었어요.
> 신라는 핏줄로 신분을 나눴어요. 골품제!
> 성골이 진덕 여왕을 끝으로 끊기자, 진골이 왕위와 높은 벼슬을 차지했죠.
> 진골 귀족은 화백 회의로 나랏일까지 좌우했어요.
> 나라는 이들에게 월급 대신, 고을을 통째로 줬어요. 녹읍!
> 그해 신문왕은 장인 김흠돌의 반란을 누르고, 687년 관료전을 주더니, 689년 녹읍을 없앱니다.
> 그리고 세월이 흘러, 722년.
> 정은 성인 남자. 땅 없는 백성엔 땅을, 짓던 땅은 나라가 인정! 세금은 나라로, 왕권은 더 강하게.
> 757년, 경덕왕 때 녹읍이 부활합니다.
> 관료전은 신문왕, 정전은 성덕왕, 녹읍 부활은 경덕왕! 저장해 두세요.

---

## 6. 자막·그래픽 스타일
| 요소 | 스타일 |
|---|---|
| 대사 자막 | 화면 세로 60~70% 위치, Pretendard ExtraBold 72px, 흰 글자 + 검은 외곽선 |
| 용어 카드 | 화면 위쪽 20~30% 위치, 한지 질감 상자 + 녹색 테두리(#4C7A6B), 굵은 용어 + 한 줄 풀이 |
| 연도 도장 | 붉은 주황(#D9822B) 도장 모양, '쾅' 효과음과 함께 |
| 안전 영역 | 화면 아래 400px와 오른쪽 140px는 YouTube 버튼 자리라 비워 두기 |
| 색 보정 | 681 = 차가운 회청색 · 722 = 황금빛 · 757 = 어두운 촛불빛 |

## 7. 사운드
- **BGM 흐름:** C01 잔잔한 현악 → C02~C09 슬픈 해금 독주 → C10 따뜻하게 전환 → C13 가장 크게 고조 → C15 갑자기 끊기고 낮은 북 → C16 밝은 마무리 효과음
- **음량:** BGM은 대사보다 −18dB 정도로 낮게

## 8. 제작 순서 체크리스트
1. [ ] 캐릭터 시트 생성: duji → duji-father, duji-child / kim → kim-grandson / steward / seongdeok / official
2. [ ] 장소 레퍼런스 생성: L1-681 → L1-722, L2, L3, L4
3. [ ] 키프레임 생성: 컷마다 2~4장 뽑아서 가장 좋은 것 고르기 (C04·C10은 끝 프레임까지)
4. [ ] **고증 확인:** 조선시대 갓·도포, 일본 기모노, 청나라 변발, 현대 물건, 알아볼 수 있는 엉터리 글자가 없는지
5. [ ] 대사·내레이션 녹음
6. [ ] 이미지 → 영상 변환 (컷당 5초)
7. [ ] 입 모양 맞추기 (🗣 컷: C01, C07, C11, C12, C15)
8. [ ] 편집: 컷 연결, 먹물 전환(C02), 색 보정
9. [ ] 자막, 용어 카드, 연도 도장, 정리 카드
10. [ ] BGM과 효과음
11. [ ] 최종 검수: 연도·제도 사실 확인, 설명란에 각색 표시

## 9. 업로드 정보
- **제목 후보:**
  1. 이 땅이… 진짜 제 땅입니까? | 신라 농부의 41년
  2. 아버지가 못 가진 땅, 아들이 받았다 #한능검
  3. 녹읍 vs 관료전 vs 정전, 1분 만에 끝
- **설명란:**
  > 녹읍에 시달리던 아버지를 보며 자란 신라 농부 두지. 41년 뒤, 그는 나라에서 정전을 받습니다.
  >
  > 📝 한능검 포인트
  > 681 김흠돌의 난 → 687 관료전 → 689 녹읍 폐지 (신문왕)
  > 722 정전 지급 (성덕왕) → 757 녹읍 부활 (경덕왕)
  > 녹읍 = 세금 + 노동력 / 관료전 = 세금만
  >
  > 📚 토지 제도 흐름: 녹읍 → 관료전 → 정전 → 고려 전시과 → 조선 과전법 → 직전법 → 관수관급제
  >
  > ※ 두지 가족과 김 대아찬 가문, 대사는 이해를 돕기 위한 각색입니다.
- **해시태그:** `#한능검 #한국사 #통일신라 #성덕왕 #신문왕 #정전 #녹읍 #관료전 #골품제 #역사쇼츠 #shorts`
- **고정댓글:**
  > Q. "관료전을 지급하고 녹읍을 폐지하였다." 이 왕은?
  > ① 신문왕 ② 성덕왕 ③ 경덕왕 👇 정답은 댓글로!

## 10. 사실 확인
| 사실 | 근거 | 사이트 데이터 |
|---|---|---|
| 681 신문왕, 김흠돌의 난 진압 | 『삼국사기』 신문왕 원년 | ✅ 김흠돌(12회) |
| 687 관료전 지급 / 689 녹읍 폐지 | 신문왕 7년 / 9년 | ✅ 녹읍(14회) |
| 722 백성에게 정전 지급 | 성덕왕 21년 | ✅ 정전 지급(74회 기출) |
| 757 녹읍 부활 | 경덕왕 16년 | ⚠ 사이트에 없음 → data/site-gaps.md |
| 진덕 여왕까지 성골, 무열왕부터 진골 왕위 | 진덕왕 8년 조 | ⚠ 사이트에 없음 → data/site-gaps.md |
| 화백 회의 = 진골 귀족 회의 | 교과서 | ✅ 화백회의(7회) |
| 관등별 관복 색 (자·비·청·황) | 『삼국사기』 잡지 색복 조 | 화면 고증용 |
| 정전의 성격 (새로 지급 / 경작지 공인) | 학설이 나뉘어 두 해석 모두 반영 | ✅ |
