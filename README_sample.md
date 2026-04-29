# 제목

- 내용

---
# 🌐 Demo

url

---

## ⚡ 실행 방법 (How to Run)

### 1. 데이터베이스 설정

- MySQL 실행 후 아래 SQL 파일 실행

```bash
경로
```
### 2. 로컬 실행

- node 설치 후 next.js 실행

```bash
npm i
npm run dev
```

---

## 📌 1. 프로젝트 개요 (Project Overview)

### 제공 기능

- 내용

---

## 🛠 2. 기술 스택 (Tech Stack)

### Front-End

- Next.js
- React Query
- Zustand

### Back-End

- Node.js

### Data

- MySQL
- JWT (인증)
- bcrypt (비밀번호 암호화)

---

## 📂 3. 프로젝트 구조 (Project Structure)

```
bravo-bank/
├── .next/                 # Next.js 빌드 결과 (자동 생성, 수정 X)
├── app/                   # App Router 기반 메인 애플리케이션 폴더
│   ├── api/               # 서버 API 라우트 (Route Handlers)
│   ├── favicon.ico       # 파비콘
│   ├── globals.css       # 전역 스타일
│   ├── layout.tsx        # 공통 레이아웃 (헤더, 푸터 등)
│   └── page.tsx          # 루트 페이지 (/)
│
├── components/           # 재사용 UI 컴포넌트
├── hooks/                # 커스텀 React 훅
├── lib/                  # 유틸 함수 / 공통 로직 / 외부 설정
│
├── node_modules/         # 설치된 패키지 (자동 생성, 수정 X)
├── public/               # 정적 파일 (이미지, svg 등)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── script/               # 스크립트 (데이터 초기화, 배치 작업 등)
│
├── .env.local            # 환경 변수 파일 (비공개)
├── .gitignore            # Git 제외 설정
├── AGENTS.md             # 프로젝트 에이전트 관련 문서
├── CLAUDE.md             # AI 협업 관련 문서
│
├── eslint.config.mjs     # ESLint 설정
├── next-env.d.ts         # Next.js 타입 정의
├── next.config.ts        # Next.js 설정
│
├── package.json          # 프로젝트 설정 및 의존성
├── package-lock.json     # 의존성 잠금 파일
│
├── postcss.config.mjs    # PostCSS 설정 (Tailwind 등)
├── tsconfig.json         # TypeScript 설정
│
└── README.md             # 프로젝트 설명 문서
```

---

## 🏗️ 4. 시스템 아키텍처 (Architecture)

```
내용
```

---

## 🔄 5. 코드 실행 흐름

```
내용
```

---

## 🔑 6. 인증 흐름 (JWT)

### 로그인 프로세스

```
내용
```

### 인증 처리

- 내용

```
프로세스
```

---

## 👤 7. 사용자 흐름

```
내용
```

---

## 📊 8. 주요 기능

### 1️⃣ 회원가입

- 입력값: Local State
- 아이디 중복 확인: Server State (React Query)
- 비밀번호 확인: Lifecycle
- 회원가입 처리: Lifecycle
- DB 반영: Server State

---

### 2️⃣ 로그인

- 입력값 검증 (미입력 시 toast)
- 로그인 성공 시 사용자 이름 표시
- 상태 관리: Global UI State (Zustand)


---

## 🧠 9. 상태 관리 (State Management)

### 상태 종류

```
Local State
→ 내용 

Server State (React Query)
→ 내용 

Global State (Zustand)
→ 내용

UI State (Lifecycle)
→ 내용
```

---

### 전체 흐름

```
내용
```

---

### 회원가입

- 입력값: Local State  
- 아이디 중복 확인: Server State
- 비밀번호 확인: UI State  
- 회원가입 요청: Server State
- DB 반영: Server State  

---

### 로그인

- 입력값: Local State  
- 미입력 toast: UI State  
- 로그인 요청: Server State  
- 로그인 결과: Global State (Zustand)  

---

### 핵심 기준

```
서버 데이터 → React Query
UI 상태 → useState
로그인 상태 → Zustand
```

---

### 주의 사항

❌ 내용 
✅ 내용


---

## ⚠️ 어려웠던 점 & 해결 방법

### 1. 제목

- 내용

👉 해결  
- 내용

---

## 📚 배운 점

### 1. 제목

- 내용

👉 해결  
- 내용

---

## 👍 좋은 점


### 1. 제목

- 내용

👉 해결  
- 내용

---

## 🚀 개선 방향 (Future Improvements)

- 내용
