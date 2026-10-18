# 프롬프트 v3 — 말릭 렌즈 · 나노바나나 + Veo 3.1

- 연출 근거: [direction.md](./direction.md) · 이미지 = 나노바나나(9:16로 바로 생성) · 영상 = Veo 3.1 이미지→영상(첫 프레임)
- 이미지 프롬프트 규칙: 자연스러운 문장으로, **렌즈 숫자(mm, f값) 쓰지 않기**, `photorealistic`·`cinematic`·`masterpiece`·`8K` 같은 과장어 쓰지 않기 (AI 티가 더 남)
- 영상 프롬프트 규칙: 첫 프레임에 이미 있는 것은 다시 설명하지 않고 **움직임·카메라·소리만**. 카메라 이동은 "경로"로, 빛은 "물리적 사실"로 쓴다
- 말소리는 Veo로 만들지 않는다 (`no speech`). 대사·속삭임은 편집에서 녹음해 얹는다

---

## 0. 공통 문구 (키프레임 프롬프트 끝에 붙이기)

**[CAPTURE] 모든 이미지**
```
The image is a still frame from 35mm colour negative film, lab scanned: fine visible grain, soft lifted blacks, gentle halation around bright highlights, natural contrast with no HDR look. Real skin with pores, sun damage and uneven tone. Vertical 9:16 frame.
```
**[MALICK] 구도**
```
The camera is very close and low with a wide-angle lens, deliberately off-centre and asymmetric; the foreground subject is large in frame and the horizon and sky fill the upper half.
```
**[ERA] 시대 고정**
```
Everything belongs to 8th-century Unified Silla Korea: thatched mud huts, unbleached hemp cloth, straw sandals or bare feet, handmade mulberry paper, only wooden, straw and bronze objects.
```
**[681] 빛**
```
Thick overcast late-autumn sky, soft shadowless daylight, cool grey-blue and mud-brown tones, low saturation.
```
**[722] 빛**
```
The sun sits just above the hills directly behind the subject and flares softly into the lens; faces and hands are lit only by the open sky and warm bounce from the ground; wheat-gold, grass-green and pale sky tones, low contrast. This is real low sunlight, not a colour filter.
```
**[757] 빛**
```
The last daylight of dusk enters through a single paper-latticed window an arm's length away; the room behind falls into near darkness; deep shadow blue with one thin amber edge of light.
```

---

## 1. 캐릭터 시트 (나노바나나 · 9:16 대신 3:2로 생성)

**① 두지 (기준 얼굴)**
```
Create a character reference sheet of one man on a plain light grey background, showing the same person four times: front view, three-quarter view, side profile and full-body view. He is a lean Korean peasant man of 47 from 8th-century Unified Silla: deeply sunburnt skin, weathered kind face with crow's feet, short sparse beard, hair in a topknot wrapped with a faded brown cloth headband, a coarse undyed hemp jacket tied at the side, loose hemp trousers bound at the ankles, straw sandals, calloused cracked hands with dirt in the knuckle creases. Real casting reference photographs on 35mm colour film in soft even daylight; natural skin with pores and sun spots; realistic proportions.
```
**② 어린 두지** (① 첨부)
```
Using the man in Image 1, create a character reference sheet of him as a thin six-year-old boy. Keep the same eyes, nose and face shape so he is clearly the same person as a child. Messy half-tied hair, oversized patched hemp clothes, bare muddy feet. Same four views on a plain light grey background, real casting photographs on 35mm colour film in soft daylight.
```
**③ 아버지** (① 첨부)
```
Using the man in Image 1, create a character reference sheet of his father at age 35. Keep a strong family resemblance — same eyes, nose and face shape — but thinner and exhausted, hollow cheeks, messy topknot with no headband, torn and patched mud-stained hemp clothes, barefoot. Same four views on a plain light grey background, real casting photographs on 35mm colour film in soft daylight.
```
**④ 손자 (기준 얼굴)**
```
Create a character reference sheet of one man on a plain light grey background, showing the same person four times: front view, three-quarter view, side profile and full-body view. He is a lean Korean aristocrat of 40 from 8th-century Unified Silla: cold narrow eyes, thin mustache, pale indoor skin, a deep purple silk round-collar official robe with a gold-ornamented belt, a black bokdu hat with stiff winged side flaps. Real casting reference photographs on 35mm colour film in soft even daylight; natural skin texture; realistic proportions.
```

## 2. 장소 (나노바나나 · 9:16)
**P1 마을 681**
```
A poor farming village in late autumn: a few thatched-roof huts with mud walls, a muddy path, harvested rice paddies of grey stubble and puddles, low bare hills behind. No people. [ERA] [681] [CAPTURE]
```
**P2 마을 722** (P1 첨부)
```
Using the village in Image 1, show exactly the same huts, path and hills forty-one years later: the paddies are full of ripe golden rice, the huts are repaired with fresh thatch. No people. [ERA] [722] [CAPTURE]
```

---

## 3. 컷별 키프레임 + 영상

> 사용법: 키프레임은 `[ ]` 문구를 실제 내용으로 바꿔 붙인다. 레퍼런스 이미지는 적힌 순서대로 첨부한다. 영상은 키프레임을 첫 프레임으로 넣고 아래 문장을 넣는다.

### K01 · 722 · 훅 (4초)
레퍼런스: Image 1 = 두지 시트, Image 2 = P2
```
Using the man from Image 1 — keep his facial features exactly the same — in the village from Image 2. An extreme close view of Duji's two calloused, sun-darkened hands holding a half-unrolled sheet of coarse handmade mulberry paper with faint, illegible brush strokes; his thumbs press so hard the paper creases. His face is above, soft and out of focus, turned down toward the paper. Ripe rice runs behind him to low hills. [MALICK] [ERA] [722] [CAPTURE]
```
```
Maintain the subject from the first frame. The camera rises slowly and drifts slightly to the right, like someone breathing while standing close, moving from his hands up past his chin and stopping just below his eyes. His thumbs tighten once on the paper, then stay still. The rice behind him sways in a steady wind.
Audio: wind through ripe rice, a dry paper rustle. No speech, no music.
Duration: 4 seconds.
Avoid: camera shake, orange colour filter, slow motion, face change.
```

### K02 · 681 · 기억으로 (4초 생성 → 2.5초 사용)
레퍼런스: Image 1 = 어린 두지 시트, Image 2 = P1
```
Using the boy from Image 1 in the village from Image 2. Seen from ankle height, very close: the bare feet of a thin six-year-old boy sinking into cold grey mud at the edge of a harvested paddy, mud between his toes, the hem of his oversized patched hemp trousers dark with water. A thin drizzle dimples the puddles. [MALICK] [ERA] [681] [CAPTURE]
```
```
Maintain the subject from the first frame. The camera drifts slowly to the left at ankle height. One toe curls into the mud and stops. Small rain rings spread across the puddle beside his foot.
Audio: thin wind, light drizzle on water. No speech, no music.
Duration: 4 seconds.
Avoid: camera shake, slow motion.
```

### K03 · 681 · 골품제 (6초 → 5초)
레퍼런스: Image 1 = 어린 두지 시트, Image 2 = P1
```
Using the boy from Image 1. Seen from the ground through tall dry winter grass, the boy crouches in the near foreground at the lower left, his back and the side of his face toward us. Far up on a dirt ridge against a heavy grey sky, a slow line of small figures in deep purple silk robes and black winged bokdu hats walks from left to right, bent servants in plain hemp walking behind them. The sky fills the upper half of the frame. [ERA] [681] [CAPTURE]
```
```
Maintain the subject from the first frame. The camera rises slowly from grass height to the boy's shoulder height while drifting to the right. The boy turns his head until his profile faces the ridge, then holds still. The procession keeps walking left to right along the ridge. Dry grass bends in the wind across the foreground.
Audio: wind through dry grass, faint distant footsteps. No speech, no music.
Duration: 6 seconds.
Avoid: camera shake, symmetrical composition, face change.
```

### K04 · 681 · 녹읍 도장 (4초 → 3.5초)
레퍼런스: 없음 (이 이미지를 K07의 레퍼런스로 저장)
```
A close, slightly overhead view of a low wooden table by a window: a sheet of hanji painted with a hand-drawn ink map of villages and paddies. A soft, well-fed hand with a pale green jade ring and a deep purple silk sleeve presses a small square bronze seal with a knob handle down onto one village; red cinnabar ink begins to show at the seal's edges. Grey daylight falls from a window at the left. [ERA] [681] [CAPTURE]
```
```
Maintain the subject from the first frame. The hand presses the seal down, holds for a beat, then lifts it straight away, leaving a sharp red square on the village. The camera drifts slowly closer to the red mark and stops.
Audio: one heavy wooden thud as the seal lands, then quiet wind outside the window. No speech, no music.
Duration: 4 seconds.
Avoid: camera shake, extra hands, readable text.
```

### K05 · 681 · 곡식 (4초)
레퍼런스: Image 1 = 아버지 시트, Image 2 = 어린 두지 시트, Image 3 = P1
```
Using the father from Image 1 and the boy from Image 2 in the village from Image 3. Very close behind the father's shoulder: his cracked, dirt-dark hands clutch the neck of a straw rice sack while another man's arm in a dark indigo hemp sleeve drags it toward the right edge of the frame; the other man's face is outside the frame. In the dark doorway of a thatched hut in the background, the small boy's face peeks half hidden. [MALICK] [ERA] [681] [CAPTURE]
```
```
Maintain the subject from the first frame. The sack slides out of the father's hands and leaves the frame to the right. His fingers stay open in the air, then slowly lower. The camera drifts in toward his empty hands and stops.
Audio: straw sack dragging over dirt, wind. A man's harsh shout far off, swallowed by the wind and impossible to make out. No clear speech, no music.
Duration: 4 seconds.
Avoid: showing the other man's face, camera shake, face change.
```

### K06 · 681 · 노동력 (6초 → 5초)
레퍼런스: Image 1 = 아버지 시트, Image 2 = 어린 두지 시트
```
Using the father from Image 1 and the boy from Image 2. A low camera behind the boy, who follows his father along a muddy path; the father walks ahead bent under a large flat stone tied to his back, beside a half-built high earthen wall of a tiled-roof mansion. A line of other bent labourers carrying stones continues ahead. [ERA] [681] [CAPTURE]
```
```
Maintain the subjects from the first frame. The camera follows one metre behind the boy at a slow, steady walking pace. The father turns his head toward a distant empty paddy on the left until his profile shows, then faces forward again. Mud splashes lightly at each step.
Audio: footsteps in mud, heavy breathing, stone scraping on stone, wind. No speech, no music.
Duration: 6 seconds.
Avoid: camera shake, slow motion, face change.
```

### K07 · 689 · 도장을 빼앗기다 (4초)
레퍼런스: Image 1 = K04 키프레임 (같은 탁자, 지도, 손, 도장)
```
Using the table, map, jade-ringed hand and bronze seal from Image 1 — keep them exactly the same. The seal now rests on the map beside the red square. A hand in a crimson silk sleeve with gold embroidery at the cuff reaches in from the top of the frame and closes around the seal's knob. The jade-ringed hand lies flat on the map below. [ERA] [681] [CAPTURE]
```
```
Maintain the subject from the first frame. The crimson-sleeved hand lifts the seal straight up and out of the frame. The jade-ringed fingers slowly curl into a fist on the map and stop. The camera drifts slightly upward after the seal, then holds.
Audio: one deep drum hit as the seal leaves the table, then wind. No speech, no music.
Duration: 4 seconds.
Avoid: extra hands, readable text, camera shake.
```

### K08a · 681 · 아이 손 (4초 → 2초)
레퍼런스: Image 1 = 어린 두지 시트, Image 2 = P1
```
Using the boy from Image 1. An extreme close view at ground level: the small hand of a thin six-year-old boy pressing palm-down into cold grey paddy mud, fingers spread, his patched hemp sleeve at the top edge of the frame. Grey stubble and puddles behind. [MALICK] [ERA] [681] [CAPTURE]
```
```
Maintain the subject from the first frame. Locked, almost still camera. The fingers press slowly deeper into the mud and begin to close. Rain rings spread on a puddle behind.
Audio: wet mud, thin rain. No speech, no music.
Duration: 4 seconds.
```

### K08b · 722 · 어른 손 (4초 → 3초) — K08a와 **같은 구도**
레퍼런스: Image 1 = K08a 키프레임, Image 2 = 두지 시트, Image 3 = P2
```
Using the exact framing, camera height and hand position of Image 1, replace the child's hand with Duji's adult hand from Image 2 — calloused, cracked, sun-darkened — pressing palm-down into dark warm soil between golden rice stalks in the paddy of Image 3. [ERA] [722] [CAPTURE]
```
```
Maintain the subject from the first frame. Locked, almost still camera. The fingers press slowly deeper into the soil and close around a fistful of it. Rice stalks behind sway in warm wind.
Audio: soft soil crumbling, wind through rice, evening insects. No speech, no music.
Duration: 4 seconds.
```

### K09 · 722 · 성덕왕 (4초 → 3.5초)
레퍼런스: 없음
```
By a tall paper-latticed window in a palace room with thick red wooden pillars, two hands in a crimson silk sleeve with gold embroidery at the cuff rest on a thick bound land register of handmade paper on a low lacquered desk; the man's face is above the frame edge. Warm late-afternoon light comes through the window paper. [ERA] [CAPTURE]
```
```
Maintain the subject from the first frame. The hands close the register and press flat on its cover, then stay still. The camera drifts slowly up from the hands toward the glowing window paper and stops.
Audio: heavy paper settling, one quiet breath, faint wind outside. No speech, no music.
Duration: 4 seconds.
Avoid: readable text, camera shake.
```

### K10 · 722 · 정전 지급 (6초 → 5초)
레퍼런스: Image 1 = 두지 시트, Image 2 = P2
```
Using the man from Image 1 — keep his facial features exactly the same — at the edge of the golden paddy from Image 2 at sunset. Very close on two pairs of hands: clean hands in a blue round-collar official's sleeve hold out a rolled paper document; Duji's calloused hands rise from below to receive it. Duji's bowed head is soft in the lower foreground. [MALICK] [ERA] [722] [CAPTURE]
```
```
Maintain the subjects from the first frame. Duji's hands close around the scroll and draw it slowly to his chest. The camera drifts up past his shoulder and tilts toward the low sun, ending on the sky over the paddy.
Audio: wind, rice rustling, evening insects. No speech, no music.
Duration: 6 seconds.
Avoid: camera shake, orange colour filter, face change.
```

### K11 · 722 · 아버지… (6초 → 4.5초, 숨 쉬는 컷)
레퍼런스: Image 1 = 두지 시트, Image 2 = P2
```
Using the man from Image 1 in the paddy from Image 2. Duji kneels alone among the golden rice, seen from behind and slightly to one side, head bowed so his face is hidden, one hand gripping a fistful of dark soil, the rolled document tucked into the front of his jacket. The sun sits on the horizon ahead of him and flares past his shoulder. [MALICK] [ERA] [722] [CAPTURE]
```
```
Maintain the subject from the first frame. The camera circles slowly a quarter turn from behind him toward his side at walking pace and stops before his face can be seen. His fist tightens and a little soil falls from between his fingers. His shoulders rise once with a breath.
Audio: wind only. No speech, no music.
Duration: 6 seconds.
Avoid: showing his face, camera shake, slow motion.
```

### K12a · 722 · 나라 창고로 (4초 → 2.5초)
레퍼런스: Image 1 = 두지 시트
```
Using the man from Image 1. Just behind Duji's shoulder as he carries a straw sack of rice on his back toward raised wooden storehouses on stilts; a tall pole with a faded red cloth banner stands above them; a few other farmers with sacks walk ahead. [ERA] [722] [CAPTURE]
```
```
Maintain the subject from the first frame. The camera follows just behind his shoulder at walking pace. The banner lifts and ripples in the wind above the storehouses.
Audio: footsteps on packed earth, sacks thumping down, wind. No speech, no music.
Duration: 4 seconds.
Avoid: camera shake.
```

### K12b · 722 · 장부 (4초 → 2초)
레퍼런스: 없음
```
An extreme close view of a brush held by a hand in a blue official's sleeve writing columns of ink on coarse hanji in an open ledger, the characters soft and illegible, stacked straw rice sacks blurred behind. Warm low sunlight from the side. [ERA] [CAPTURE]
```
```
Maintain the subject from the first frame. Locked camera. The brush finishes one downward stroke and lifts off the paper.
Audio: brush on paper, a sack being set down nearby. No speech, no music.
Duration: 4 seconds.
Avoid: readable text.
```

### K13 · 757 · 녹읍 부활 (4초)
레퍼런스: Image 1 = 손자 시트, Image 2 = K04 키프레임 (같은 도장)
```
Using the man from Image 1 — keep his facial features exactly the same — and the bronze seal from Image 2. He sits beside a paper-latticed window at dusk, seen in profile with half his face in darkness. In the foreground his open palm holds the same small square bronze seal, its face stained with old dried red ink. [MALICK] [ERA] [757] [CAPTURE]
```
```
Maintain the subject from the first frame. His fingers close slowly over the seal until only a thin edge of red shows between them, then stop. The camera drifts slightly closer toward the fist and holds.
Audio: low wind outside the window, one distant drum hit. No speech, no music.
Duration: 4 seconds.
Avoid: camera shake, face change, candles.
```

### K14 · 722 · 마무리·반복 연결 (6초 → 4.5초)
레퍼런스: Image 1 = 두지 시트, Image 2 = P2
```
Using the man from Image 1 in the village from Image 2. Duji stands small in the lower third of the frame at the edge of the golden paddy, seen from behind, the rolled document in one hand at his side; the low sun sits ahead of him on the hills and the pale evening sky fills the upper half. [ERA] [722] [CAPTURE]
```
```
Maintain the subject from the first frame. The camera drifts forward very slowly toward his back and stops. The rice around him sways in the wind.
Audio: wind through rice, evening insects. No speech, no music.
Duration: 6 seconds.
Avoid: camera shake, orange colour filter.
```

---

## 4. 녹음 (편집에서 얹기)
| 컷 | 역할 | 방식 | 대사 |
|---|---|---|---|
| K01 | 두지 | 속삭임, 마이크 가까이, 숨소리 | "이 땅이… 진짜 제 땅입니까." |
| K03 | 두지(회상 내레이션) | 낮은 속삭임 | "그때 세상은, 태어날 때 정해져 있었다." |
| K05 | 집사 | 멀리서 고함, 바람 소리에 반쯤 묻히게 | "한 톨도 빼먹지 마라!" |
| K06 | 아버지 | 지친 혼잣말, 거의 안 들리게 | "우리 논은… 언제 가누…" |
| K09 | 성덕왕 | 낮고 단단하게, 조용히 | "백성이 짓는 땅은, 나라가 챙겨야 한다." |
| K10 | 관리 | 화면 밖, 따뜻하게 | "이 땅은 이제, 네가 갈아라." |
| K11 | 두지 | 떨리는 속삭임 | "아버지… 보고 계십니까." |
| K13 | 손자 | 차가운 속삭임 | "할아버지의 고을이… 돌아왔다." |
| K14 | 내레이터 | 또렷하고 밝게 (포맷 규칙) | "관료전은 신문왕, 정전은 성덕왕, 녹읍 부활은 경덕왕. 저장해 두세요." |

## 5. 다른 영상 도구를 쓸 때
- **Kling:** 영상 프롬프트 첫 줄의 `Maintain the subject from the first frame.`은 그대로 두고, `Audio:` 줄을 빼고 `Avoid:` 내용을 부정 프롬프트 칸에 넣는다.
- **Seedance:** 클립 길이를 5초로 맞추고 카메라 고정 옵션은 K08a·K08b·K12b에만 켠다.
