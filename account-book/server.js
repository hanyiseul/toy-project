// server 실행 기능 구현
require('dotenv').config();
const express = require("express"); // express 모듈
const path =require("path"); // 경로 모듈
const app = express(); // express 객체 생성
const port = 8000;
const router = require('./routes/pageRouter'); // pageRoute.js 불러오기
// const userRouter = require('./routes/userRouter'); // userRoute.js 불러오기
// const accountRouter = require('./routes/accountRouter'); // accountRouter.js 불러오기


app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 경로
app.get('/favicon.ico', (_, res) => res.status(204)); // 파비콘 무시


// Express 미들웨어 설정
// 모든 API 요청이 들어오기 전에 실행되는 전처리 단계
// 서버 전체에 적용되어야 하기 때문에 server.js에서 실행
app.use(express.json()); // express.json() : json 파일 읽게 해주는 설정

// 꼭 app.use(express.json()); 다음에 실행
app.use(router); // pageRouter 실행
// app.use("/api/user", userRouter); // "/api/user"로 시작하는 모든 요청은 userRouter에서 처리
// app.use("/api/account", accountRouter); // "/api/account"로 시작하는 모든 요청은 userRouter에서 처리

// local 실행
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log("연결 성공")
});