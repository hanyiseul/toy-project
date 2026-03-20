// server 실행 기능 구현
const express = require("express"); // express 모듈
const path =require("path"); // 경로 모듈
const app = express(); // express 객체 생성
const port = 8000;
const route = require('./backend/route/pageRouter'); // pageRoute.js 불러오기


app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 경로
app.get('/favicon.ico', (_, res) => res.status(204)); // 파비콘 무시

app.use(route); // pageroute 실행

// Express 미들웨어 설정
// 모든 API 요청이 들어오기 전에 실행되는 전처리 단계
// 서버 전체에 적용되어야 하기 때문에 server.js에서 실행
app.use(express.json()); // express.json() : json 파일 읽게 해주는 설정

// local 실행
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log("연결 성공")
});