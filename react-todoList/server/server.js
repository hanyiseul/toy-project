// server.js : 서버 구현 

// 모듈 설정
require('dotenv').config(); // .env 파일 읽기 (JWT_SECRET 랜덤키 설정)
const express = require("express"); // express 모듈
const path = require("path"); // path 모듈
const app = express(); // express 사용을 위한 객체 생성
const port = 5000; // 서버 포트 설정
const userRouter = require('./routes/userRouter'); // userRoute.js 불러오기
const todoRouter = require('./routes/todoRouter'); // accountRouter.js 불러오기

// Express 미들웨어 설정 - api 요청 들어오기 전에 실행되는 전처리 단계 (모든 서버에서 적용)
// cors : 리액트 개발 서버에서 해당 서버로 api 요청 들어올 때 cors 허용 (로컬 개발용)
const cors = require('cors'); // CORS 모듈 (다른 도메인 내에서 내 서버에 요청할 수 있게 허용해주는 설정용 미들웨어)
app.use(cors()); // CORS 설정
app.use(express.json()); // json 파일 읽게 해주는 설정

// 라우터 설정
app.use("/api/user", userRouter); // "/api/user"로 시작하는 모든 요청은 userRouter에서 처리
app.use("/api/todo", todoRouter); // "/api/todo"로 시작하는 모든 요청은 todoRouter에서 처리


// 클라우드 설정용
app.use(express.static(path.join(__dirname, 'static'))); // static 폴더를 정적 파일 제공 폴더로 설정
app.get('/favicon.ico', (_, res) => res.status(204)); // 파비콘 무시

// local 실행
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log("연결 성공")
});