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
│   │   ├── components         # r공통 컴포넌트
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
