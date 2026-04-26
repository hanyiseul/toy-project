// user server 테스트
// user.test.js -> (.test.js) jest 테스트 파일 이름 규칙
const express = require("express"); // express 모듈
const request = require("supertest"); // 서버를 띄우지 않고 HTTP 요청 보내는 테스트 라이브러리
const app = express();
app.use(express.json());

// 실제 db 접근 안하고 라우터 연결만 검증
// jest.mock("../controllers/userController", () => ({
//   signup: (req, res) => res.status(200).json({ message: "ok" }),
//   checkId: (req, res) => res.status(200).json({ exists: false }),
//   login: (req, res) => {
//     res.cookie("token", "fake-token", {
//       httpOnly: true
//     });
//     res.status(200).json({ success: true });
//   },
//   verify: (req, res) => res.status(200).json({ success: true })
// }));

const userRouter = require("../routes/userRouter");

// user router 테스트 코드
app.use("/user", userRouter); // user 라우터를 "/user" 경로로 지정

// 테스트를 위한 db 삽입 쿼리
const pool = require("../db"); // DB 연결

beforeAll(async () => {
  await pool.query(`
    INSERT INTO users (name, user_id, pwd)
    VALUES ('테스트', 'test1234', '1234')
  `);
});

// describe : Jest에서 테스트를 묶는 그룹 함수
describe("User API Test", () => {
  // 회원가입 테스트
  it("POST /user/signup", async () => { // it: 테스트 코드 범위
    // request(app)를 서버에 http 처리 요청
    // post 요청으로 회원가입 api 호출
    // send로 요청 바디 전달
    const res = await request(app)
      .post("/user/signup")
      .send({
        name: "테스트",
        user_id: "test123",
        pwd: "1234",
      });
    console.log(res.body); // 응답 결과 콘솔 확인용
    expect(res.statusCode).toBe(200); // 상태코드가 200인지 확인 (성공여부)
    expect(res.body).toHaveProperty("message"); // message를 응답 받는지 확인
  });
  // 아이디 중복 체크 테스트
  it("GET /user/checkId", async () => {
    // get으로 아이디 중복체크 api 호출
    // query string으로 userId 전달
    const res = await request(app)
      .get("/user/checkId")
      .query({ user_id: "test123" });
    console.log(res.body); // 응답 결과 콘솔 확인용
    expect(res.statusCode).toBe(200); // 상태코드가 200인지 확인 (성공여부)
    expect(res.body).toHaveProperty("exists"); // exists 응답 확인
  });
  // 로그인 테스트
  it("POST /user/login", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        user_id: "test1234",
        pwd: "1234"
      });
    console.log(res.body); // 응답 결과 콘솔 확인용
    console.log(res.headers["set-cookie"]); // 응답 결과 콘솔 확인용
    expect(res.statusCode).toBe(200); // 상태코드가 200인지 확인 (성공여부)
    expect(res.body).toHaveProperty("success", true); // exists 응답 확인
    expect(res.headers["set-cookie"]).toBeDefined(); // 쿠키 존재 확인
    expect(res.headers["set-cookie"][0]).toContain("token="); // 토큰 쿠키 포함 확인
    expect(res.headers["set-cookie"][0]).toContain("HttpOnly"); // httpOnly 옵션 확인
  });
});

// 테스트 완료 후 쿼리 삭제
// afterAll(async () => {
//   await pool.query(`
//     DELETE FROM users WHERE user_id = 'test1234'
//   `);
//   await pool.end();
// });