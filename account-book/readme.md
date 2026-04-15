# 📒 Account Book System

- 사용자별 수입/지출을 관리할 수 있는 가계부 웹 애플리케이션
- 월별 데이터 조회 및 고정 지출 합산 기능 제공
- JWT 기반 인증을 통해 사용자 데이터 보호
  
---

# 🌐 Demo

https://edt-ordinary-slots-studies.trycloudflare.com

---

## ⚡ 실행 방법 (How to Run)

```bash
node server.js
```

---

## 📌 1. 프로젝트 개요 (Project Overview)

### 제공 기능

* 회원가입 / 로그인 (JWT 인증)
* 가계부 등록 / 수정 / 삭제
* 월별 데이터 조회
* 고정 지출 합산
* 사용자별 데이터 관리 (계정 기반)

---

## 🛠 2. 기술 스택 (Tech Stack)

### Front-End

* HTML5
* CSS3
* JavaScript (ES6)

### Back-End

* Node.js
* Express

### Data

* MySQL
* JWT (인증)
* bcrypt (비밀번호 암호화)

---

## 📂 3. 프로젝트 구조 (Project Structure)

```
account-book
│
├── controllers
│ ├── accountController.js
│ └── userController.js
│
├── middleware
│ └── authMiddleware.js
│
├── models
│ ├── accountModel.js
│ └── userModel.js
│
├── node_modules
│
├── public
│ ├── assets
│ └── templates
│ ├── index.html
│ ├── login.html
│ ├── register.html
│ └── signup.html
│
├── routes
│ ├── accountRouter.js
│ ├── pageRouter.js
│ └── userRouter.js
│
├── services
│ ├── accountService.js
│ └── userService.js
│
├── .env
├── .gitignore
├── db.js
├── member.sql
├── package-lock.json
└── package.json
```

---

## 🏗️ 4. 시스템 아키텍처 (Architecture)

### 전체 구조

```
브라우저
   ↓
Router (URL 연결)
   ↓
Controller (요청/응답 처리)
   ↓
Service (비즈니스 로직)
   ↓
Model (DB 쿼리)
   ↓
DB (데이터 저장)
```

---

## 🔄 5. 코드 실행 흐름

```
1️⃣ DB 구조 (SQL)
2️⃣ Model (DB Query)
3️⃣ Service (비즈니스 로직)
4️⃣ Controller (요청/응답)
5️⃣ Router (URL 연결)
6️⃣ Server (라우터 등록)
```

---

## 🔑 6. 인증 흐름 (JWT)

### 로그인 프로세스

```
로그인 요청
↓
Controller
↓
Service
↓
Model
↓
DB 사용자 조회
↓
bcrypt.compare (비밀번호 검증)
↓
JWT 발급
↓
토큰 반환
```

### 인증 처리

- 모든 페이지에서 인증 필요
- `jwtAuth.js` 미들웨어로 공통 처리

```
클라이언트 요청
↓
JWT 토큰 포함
↓
jwtAuth 미들웨어 검증
↓
정상 → 다음 로직 실행
비정상 → 접근 차단
```

---

## 👤 7. 회원가입 / 로그인

### 회원가입 흐름

```
회원가입 입력
↓
아이디 중복 확인 (UNIQUE)
↓
비밀번호 확인
↓
회원가입 요청
↓
회원가입 완료 → 로그인 이동
```

### 로그인

- 비밀번호 4자리 기반 인증
- JWT 토큰 발급 후 사용자 정보 유지

---

## 📊 8. 주요 기능

### 메인 페이지 (index)

* 로그인한 사용자 아이디 표시
* 월 이동 기능 (이전 / 다음)
* 선택한 월 데이터 조회
* 고정 지출 합산 표시

---

### 가계부 등록 (register)

#### 문제 해결 경험

- 데이터가 DB에 저장되지 않는 문제 발생  
→ 원인: `user_id` 누락  
→ 해결: JWT 미들웨어에서 사용자 정보 추출하여 처리

---

### 데이터 조회

- 계정별 / 월별 / 조건별 조회 시 오류 발생
- 해결 방법:
  * 케이스별 쿼리 분리
  * 조건을 변수로 관리하여 처리

---

### 수정 기능

- 등록 / 수정 분기 처리 구현
- 수정 시 상세 조회 기능 추가
- 수입/지출 데이터 누락 문제 해결

---

## ⚠️ 9. 트러블 슈팅 (Issues & Fixes)

### 1. DB 저장 안되는 문제

- 원인: 로그인 사용자 정보 없음
- 해결: `jwtAuth.js`에서 user_id 주입

---

### 2. 조회 API 오류

- 원인: 다양한 조건 처리 미흡
- 해결: 조건별 쿼리 분리 후 동적 처리

---

### 3. JWT 미들웨어 이해 어려움

- 문제:
  - 토큰을 어디서 받고
  - 어떻게 라우터에 연결되는지 혼란

- 해결:
  - 요청 → 미들웨어 → 컨트롤러 흐름 이해

---

## 📚 10. 배운 점 (Learned)

### 아키텍처

* Controller / Service / Model 구조 분리의 중요성
* 역할별 책임 분리가 유지보수에 큰 영향

---

### 인증

* JWT 인증 흐름 이해
* 미들웨어를 통한 공통 로직 처리

---

### 데이터 처리

* 사용자별 데이터 분리 필요성
* 조건별 쿼리 설계 방법

---

### 문제 해결

* 에러 원인을 단계별로 추적하는 방식
* (Controller → Service → Model → DB)

---

## 🚀 11. 개선 방향 (Future Improvements)

* 필터 기능 개선 (조건 검색)
* UI/UX 개선
* 데이터 시각화 추가
* 코드 리팩토링 (중복 제거)
