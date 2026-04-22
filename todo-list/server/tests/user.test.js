// user server 테스트
// user.test.js -> (.test.js) jest 테스트 파일 이름 규칙
const express = require("express"); // express 모듈
const request = require("supertest"); // 서버를 띄우지 않고 HTTP 요청 보내는 테스트 라이브러리
const app = express();
app.use(express.json());

// 실제 db 접근 안하고 라우터 연결만 검증
jest.mock("../controllers/userController", () => ({
  signup: (req, res) => res.status(200).json({ message: "ok" }),
  checkId: (req, res) => res.status(200).json({ exists: false }),
}));

const userRouter = require("../routes/userRouter");

// user router 테스트 코드
app.use("/user", userRouter);
// describe : Jest에서 테스트를 묶는 그룹 함수
describe("User API Test", () => {
  // 회원가입 테스트
  it("POST /user/signup", async () => { // it: 테스트 코드 범위
    const res = await request(app)
      .post("/user/signup")
      .send({
        userId: "test123",
        password: "1234",
      });
    console.log(res.body);
    expect(res.statusCode).toBe(200); // 상황에 맞게 수정
    expect(res.body).toHaveProperty("message");
  });
  // 아이디 중복 체크 테스트
  it("GET /user/checkId", async () => {
    const res = await request(app)
      .get("/user/checkId")
      .query({ userId: "test123" });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("exists"); // true/false
  });

});
