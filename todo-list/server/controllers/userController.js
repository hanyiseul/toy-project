// userController.js : 응답/요청 데이터 처리

// 연결 설정
const userService = require("../services/userService.js"); // 비즈니스 로직 파일 연결
const jwt = require("jsonwebtoken"); // jwt 인증 모듈 연결
const JWT_SECRET = process.env.JWT_SECRET; // env 파일에서 시크릿키 가져옴

// 회원가입
exports.signup = async(req, res) => {
  try {
    // 프론트에서 요청 보낸 값 그대로 처리
    const { name, user_id, pwd } = req.body

    // userService 처리값을 result에 담기
    const result = await userService.signup(name, user_id, pwd);
    res.json(result);
  } catch (err) {
    console.error("controller 에러: ", error);
    
    res.json({
      success: false,
      message: "controller 회원가입 에러"
    }); 
  }
}

// 회원가입 - 아이디 중복 체크
exports.checkId = async(req, res) => {
  try {
    const {user_id} = req.query;

    // userService 처리값을 result에 담기
    const result = await userService.checkId(user_id);
    res.json(result);
  } catch (err) {
    console.error("controller 에러: ", error);
  }
}

// userService test code
// (async () => {
//   await userService.signup("test1","test1","1234");
//   const result = await userService.checkId("test1");
//   console.log(result);
// })();
