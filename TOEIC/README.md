# 📚 TOEIC Practice System

- 토익 문제를 풀어보고 결과를 분석할 수 있는 토익 CBT
- 사용자는 문제를 풀고 결과를 확인한 뒤 **Part/Category 별 오답 분석**을 통해 보충할 부분 확인 가능
- **Leaflet 기반 지도 기능**을 통해 토익 시험장 정보 확인 가능

---

## 📷 Preview

| 문제풀이 | 결과 | 분석 | 지도 |
|----------|------|------|------|
| ![](./screenshots/test.webp) | ![](./screenshots/result.webp) | ![](./screenshots/analysis.webp) | ![](./screenshots/map.webp) |
---


## ⚡ 실행 방법 (How to Run)

```bash
node server.js
```

---

## 📌 1. 프로젝트 개요 (Project Overview)

### 제공 기능
* 문제 풀이
* 문제 결과 확인
* 유형별 오답 분석
* 토익 시험장 정보 및 지도 조회

---

## 🛠 2. 기술 스택 (Tech Stack)

### Front-End

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**
* **Chart.js** : 데이터 시각화
* **Leaflet.js** : 지도 구현

### Back-End

* **Node.js**

### Data

* **JSON 기반 문제 데이터** (`database.js`)
* **LocalStorage** : 사용자 답안 저장

---

## 📂 3. 프로젝트 구조 (Project Structure)

```
TOY-PROJECT
│
└── TOEIC
    │
    ├── assets
    │   ├── css
    │   │   └── common.css
    │   │
    │   ├── js
    │   │   ├── common.js
    │   │   ├── database.js
    │   │   └── mapdata.js
    │   │
    │   └── media
    │       └── images
    │           ├── p1_q1.jpg
    │           ├── p1_q1.png
    │           └── p7_email1.jpg
    │
    ├── html
    │   ├── test.html
    │   ├── result.html
    │   ├── analysis.html
    │   └── map.html
    │
    ├── server.js
    │
    └── README.md
```

---

## 💻 4. 핵심 구현 기술 (Technical Detail)

### Front-End

#### Chart.js 활용

사용자가 문제 풀이 후 얻은 **결과 분석 데이터를 시각화**하여
오답 유형을 직관적으로 확인할 수 있도록 구현

#### 지도 기능 (Leaflet)

Leaflet.js를 활용하여 **토익 시험장 위치를 지도에 표시**하고
사용자가 원하는 지역의 시험장 정보를 확인할 수 있도록 구현

### Back-End

#### Node.js HTTP 서버 직접 구현

* Express 없이 Node.js의 **내장 http 모듈**을 사용하여 웹 서버 직접 구현

### 데이터 관리

* 문제 데이터는 `database.js`에서 **JSON 형태로 관리**
* 클라이언트에서 데이터를 불러와 문제 렌더링

---

## 🏗️ 5. 시스템 아키텍처 (Architecture)

### 페이지 흐름

```
문제 풀이 → 결과 확인 → 데이터 분석 → 시험장 지도
```

### 아키텍처 흐름

```
사용자 입력
      │
      ▼
문제 페이지 (test.html)
      │
      │ radio 선택
      ▼
answers 객체 저장
      │
      ▼
localStorage 저장
      │
      ▼
result.html 이동
      │
      ▼
정답 비교 및 채점
      │
      ▼
결과 및 해설 출력
```

### 데이터 흐름

```
문제 데이터 (database.js)
        ↓
문제 풀이 페이지
        ↓
사용자 답안 localStorage 저장
        ↓
분석 페이지 로딩
        ↓
오답 계산
        ↓
Chart.js 시각화
```

---

## 📑 6. 회고 (Retrospective)

### 👍 Good (좋았던 점)

기획 단계에서 의도했던 기능 대부분 구현

* 문제 렌더링
* 답안 선택 및 OMR 동기화
* 결과 채점
* 결과 분석

특히 **문제 선택 UI와 답안판 UI를 동기화하는 로직**을 구현하여 사용자가 문제 풀이 상태를 쉽게 확인할 수 있도록 개선

또한 **Express 없이 Node.js 내장 모듈로 서버를 구현**하면서 Node.js 동작 구조에 대한 이해도를 높일 수 있었음

### 😢 Bad (아쉬운 점)

초기 설계 단계에서 **DOM 구조와 데이터 구조를 분리하지 않아** DOM 요소와 문제 데이터 객체를 혼동하는 문제가 발생

또한 이벤트를 **각 요소에 개별 등록**하여 코드가 길어졌고 향후 **이벤트 위임 방식으로 개선할 필요**가 있음

#### 추가 개선 필요 기능

1. 체크박스 문제 중복 선택 처리
2. 미응답 문제 확인 기능
3. 문제를 한 문제씩 보여주는 페이징 기능

### 📚 Learned (배운 점)

#### JavaScript

* `map()`을 활용한 **동적 UI 렌더링**
* Chart.js `dataset`을 활용한 데이터 전달
* `localStorage`를 활용한 클라이언트 데이터 저장

#### 데이터 구조 설계

* 문제 데이터(JSON)와 UI 구조를 **분리하여 연결하는 방식**

#### Node.js

* HTTP 서버 동작 구조 이해
  (클라이언트 요청 → 서버 처리 → 응답 반환)

* Node.js 파일 처리 방식 이해

  * 동기 방식
  * 비동기 방식

* Express 같은 **프레임워크가 필요한 이유 체감**

