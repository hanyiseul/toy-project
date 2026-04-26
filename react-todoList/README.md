# 📒 Todo List System

- 사용자별 할 일을 관리할 수 있는 웹 애플리케이션
- JWT 기반 인증을 통해 사용자별 데이터 보호
- React Query를 활용한 서버 상태 관리

---

## ⚡ 실행 방법 (How to Run)

```bash
node server.js
```

---

## 📌 1. 프로젝트 개요 (Project Overview)

### 제공 기능

- 회원가입 / 로그인 (JWT 인증)
- 로그인 인증 미들웨어
- 할일 등록 / 조회 / 수정 / 삭제 (CRUD)
- 사용자별 데이터 관리

---

## 🛠 2. 기술 스택 (Tech Stack)

### Front-End

- React
- React Query
- Zustand

### Back-End

- Node.js
- Express

### Data

- MySQL
- JWT (인증)
- bcrypt (비밀번호 암호화)

---

## 📂 3. 프로젝트 구조 (Project Structure)

```
react-todoList
│
├── client
│   ├── src
│   │   ├── api                # 서버 통신
│   │   │   ├── authAPI.js
│   │   │   ├── todoAPI.js
│   │   │   └── userAPI.js
│   │   │
│   │   ├── components         # 재사용 UI
│   │   │   ├── common
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Input.jsx
│   │   │   │
│   │   │   └── todo
│   │   │       ├── TodoForm.jsx
│   │   │       └── TodoList.jsx
│   │   │
│   │   ├── hooks              # React Query / 커스텀 훅
│   │   │   └── useTodoState.js
│   │   │
│   │   ├── layout             # 레이아웃
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Main.jsx
│   │   │
│   │   ├── pages              # 페이지 단위
│   │   │   ├── Login
│   │   │   │   └── page.jsx
│   │   │   ├── Signup
│   │   │   │   └── page.jsx
│   │   │   └── Todo
│   │   │       └── page.jsx
│   │   │
│   │   ├── store              # 전역 상태 (Zustand)
│   │   │   └── authStore.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   └── vite.config.js
│
├── server
│   ├── controllers
│   │   ├── todoController.js
│   │   └── userController.js
│   │
│   ├── services
│   │   ├── todoService.js
│   │   └── userService.js
│   │
│   ├── models
│   │   ├── todoModel.js
│   │   └── userModel.js
│   │
│   ├── routes
│   │   ├── todoRouter.js
│   │   └── userRouter.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── tests
│   │
│   ├── server.js
│   └── .env
│
├── sql
│   ├── users.sql
│   └── todos.sql
│
├── README.md
└── package.json
```

---

## 🏗️ 4. 시스템 아키텍처 (Architecture)

```
client
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
DB
```

---

## 🔄 5. 코드 실행 흐름

```
DB → Model → Service → Controller → Route → Server
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
DB 조회
↓
bcrypt 검증
↓
JWT 발급
↓
httpOnly 쿠키 저장
```

### 인증 처리

- 로그인 인증 미들웨어로 사용자 검증
- 필요한 route에서 middleware 호출

```
요청
↓
authMiddleware
↓
정상 → 다음 로직
비정상 → 접근 차단
```

---

## 👤 7. 사용자 흐름

```
회원가입 → 로그인 → 할일 데이터 로딩 → 화면 반영
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

### 3️⃣ 할일 입력

- 로그인한 사용자 할일 데이터 조회
- 입력값 관리: Local State
- 빈값 입력 시 에러 처리
- 등록 후 React Query로 자동 반영

---

### 4️⃣ 할일 삭제

- 삭제 버튼 클릭
- 서버 요청 후 데이터 갱신
- React Query 캐시 무효화 → 리렌더링

---

### 5️⃣ 할일 수정

- input을 통해 값 수정
- 수정 버튼 클릭 시 서버 반영
- React Query로 데이터 갱신

---

## 🧠 9. 상태 관리 (State Management)

### 상태 종류

```
Local State
→ input 값, 수정값

Server State (React Query)
→ todos 데이터, CRUD 결과

Global State (Zustand)
→ 로그인 사용자 정보

UI State (Lifecycle)
→ 로딩, 에러, toast
```

---

### 전체 흐름

```
회원가입 → 로그인 → todo 조회 → CRUD → 자동 반영
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

### 할일 조회

- useQuery 기반 데이터 관리  
- queryKey: ["todos"]  
- Stale-While-Revalidate 방식  

---

### 할일 입력

- input 값: Local State  
- 등록 요청: Server State (ReactQuery-useMutation) 
- invalidateQueries로 자동 갱신  

---

### 할일 삭제

- 버튼 클릭: Local 이벤트  
- 삭제 요청: Server State (ReactQuery-useMutation) 
- invalidateQueries로 리스트 갱신  

---

### 할일 수정

- input 수정값: Local State  
- 수정 요청: Server State (ReactQuery-useMutation) 
- 서버 반영 후 재조회  

---

### 핵심 기준

```
서버 데이터 → React Query
UI 상태 → useState
로그인 상태 → Zustand
```

---

### 주의 사항

❌ todos를 useState로 관리하지 않음  
✅ todos는 반드시 React Query로 관리  


---

## ⚠️ 어려웠던 점

- 클라이언트 없이 백엔드를 작성하고, 결과를 계속 테스트로만 확인해야 해서 어려웠음 (잘 하고 있는 건지에 대한 의문이 계속 생겼음)
- 여러 테스트 방법을 찾느라 시간이 많이 소요됨
- 클라이언트를 보지 못한 상태에서 테스트 에러가 발생하면 멘탈적으로 힘들었음
- 이전에는 클라이언트 선작업 → 서버 후작업 방식이라 중간중간 연결 상태를 확인할 수 있었는데, 이번에는 서버 선작업 → 클라이언트 후작업으로 진행해서 서버가 클라이언트와 잘 연결될지 걱정됨
- 로그인 인증 미들웨어는 아직 익숙하지 않아서 많이 어렵게 느껴졌음
- 헤더(LocalStorage) 기반 인증과 쿠키 기반 인증이 섞이면서 혼란이 있었음
- React Query 개념이 처음에는 잘 와닿지 않았고, 특히 낙관적 업데이트 개념이 이해하기 어려웠음

---

## 📚 배운 점

- JWT 토큰을 httpOnly 쿠키에 저장하여 JS에서 접근하지 못하도록 함으로써 보안을 강화할 수 있다는 것을 배움
- 백엔드 테스트를 단계별(테스트 코드 / 서버 연결 테스트 등)로 진행하면서 다양한 테스트 방법을 익힘
- React의 useState / useEffect / useRef 등의 기본 훅에 대한 이해도가 높아짐
- React Query와 Zustand를 언제, 어디서, 어떻게 사용하는지에 대한 역할 구분이 가능해짐

---

## 👍 좋은 점

- CRUD 구조는 대부분 패턴이 비슷하다는 것을 느꼈고, 익숙해지면 작업 속도가 훨씬 빨라질 것이라는 깨달음을 얻음
- 단순 구현을 넘어서, 기존 구조를 어떻게 더 개선하고 발전시킬 수 있을지 고민하게 되었음
- 백엔드를 먼저 구현하면서 전체적인 백엔드 작업 흐름에 대한 이해도가 더 높아짐

---

## 🚀 개선 방향 (Future Improvements)

- 필터 기능 (전체 / 완료 / 진행)
- 낙관적 업데이트 확대 적용
- 코드 리팩토링
- alert을 toast 처리