# 🎬 Scroll Interaction Web

스크롤 위치에 따라 다양한 애니메이션이 동작하는 **스크롤 인터랙션 웹 프로젝트**입니다.

Sticky Section 구조와 스크롤 비율 계산을 기반으로  
텍스트, 이미지, 배너 애니메이션을 구현했습니다.

이미지 시퀀스 기법을 사용하여 **스크롤에 따라 영상처럼 보이는 인터랙션 효과**도 구현했습니다.

---

# 🌐 Demo

https://hanyiseul.github.io/toy-project/interaction/index.html

---

# ⚡ 실행 방법 (How to Run)

이 프로젝트는 별도의 서버 실행 없이 **HTML 파일을 열어 실행**할 수 있습니다.

```bash
parallax.html 파일 실행
```

또는

```
브라우저에서 parallax.html 열기
```

---

# 📌 1. 프로젝트 개요 (Project Overview)

### 주요 기능

* 스크롤 기반 인터랙션 애니메이션
* Sticky Section UI
* 스크롤 텍스트 애니메이션
* 이미지 전환 인터랙션
* 이미지 시퀀스 애니메이션
* 무한 스크롤 배너
* Floating 버튼 애니메이션

---

# 🛠 2. 기술 스택 (Tech Stack)

### Front-End

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**

### Animation

* Scroll 기반 애니메이션 구현
* **requestAnimationFrame**
* **CSS Transform / Opacity 애니메이션**

### Style

* **SCSS (Sass)**

---

# 📂 3. 프로젝트 구조 (Project Structure)

```
interaction
│
├── assets
│   ├── css
│   │   └── index.css
│   │
│   ├── fonts
│   │
│   ├── img
│   │
│   └── js
│       └── parallax.js
│
├── scss
│   ├── _colors.scss
│   ├── _fonts.scss
│   ├── _parallax.scss
│   ├── reset.scss
│   └── index.scss
│
└── parallax.html
```

---

# 💻 4. 핵심 구현 기술 (Technical Detail)

## Scroll Animation 구조

페이지를 여러 **Scene(Section)** 으로 나누고  
스크롤 위치에 따라 각 Scene의 애니메이션을 실행하도록 구현했습니다.

```
section0 : intro
section1 : scroll text animation
section2 : image transition
section3 : image sequence animation
section4 : scroll banner
section5 : floating button
```

각 Scene은 다음 정보를 가지고 있습니다.

* section 높이
* animation values
* DOM 요소

이를 기반으로 현재 스크롤 위치에 맞는 애니메이션을 실행합니다.

---

## Scroll Ratio 기반 애니메이션

스크롤 위치를 **비율(scrollRatio)** 로 계산하여  
DOM 스타일 값을 변경하는 방식으로 애니메이션을 구현했습니다.

예시

```
opacity
transform
translate
clip-path
```

이를 통해 스크롤 위치에 맞는 자연스러운 인터랙션을 구현했습니다.

---

## Image Sequence Animation

여러 장의 이미지를 순서대로 교체하여  
스크롤에 따라 **영상처럼 보이는 인터랙션 효과**를 구현했습니다.

```
LOOPY-1.png
LOOPY-2.png
LOOPY-3.png
...
```

스크롤 위치에 따라 이미지 번호를 계산하여  
이미지를 교체하는 방식으로 구현했습니다.

---

## requestAnimationFrame 기반 애니메이션

스크롤 이벤트를 직접 처리하지 않고  
`requestAnimationFrame`을 사용하여 애니메이션 루프를 구현했습니다.

```
scroll event
      ↓
requestAnimationFrame
      ↓
animation loop
```

이를 통해

* 애니메이션 끊김 감소
* 브라우저 렌더링 최적화

효과를 얻었습니다.

---

# 🏗️ 5. 인터랙션 흐름 (Interaction Flow)

```
사용자 스크롤
      │
      ▼
scroll event 발생
      │
      ▼
현재 scrollY 계산
      │
      ▼
현재 Scene 계산
      │
      ▼
Animation Value 계산
      │
      ▼
DOM Style 변경
      │
      ▼
스크롤 인터랙션 실행
```

---

# 📑 6. 회고 (Retrospective)

## 👍 Good

스크롤 기반 인터랙션을 **라이브러리 없이 직접 구현**하면서

* Scroll Scene 구조 설계
* Scroll Ratio 기반 애니메이션 계산
* requestAnimationFrame 기반 렌더링 구조

등 인터랙션 구현 방식에 대한 이해도를 높일 수 있었습니다.

또한 이미지 시퀀스를 활용하여  
스크롤 기반 영상 인터랙션 효과를 구현했습니다.

---

## 😢 Bad

애니메이션 로직이 하나의 JavaScript 파일에 집중되어  
코드가 다소 길어졌습니다.

또한 Scene 구조가 늘어나면서

* 코드 분리
* 모듈화

필요성을 느꼈습니다.

---

## 📚 Learned

### JavaScript

* Scroll 기반 인터랙션 구현
* requestAnimationFrame 활용
* Scroll Ratio 계산 방식

### UI / Interaction

* Sticky Layout
* Scroll Driven Animation
* Image Sequence Animation