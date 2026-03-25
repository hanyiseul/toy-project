// userController.js : model 호출, 요청 데이터 처리
// 요청(req)를 받아서 처리하고 응답(res)을 보내는 역할 => 결과를 받아서 프론트에 전달

const userService = require("../services/userService.js"); // 비즈니스 로직 파일
const jwt = require("jsonwebtoken"); // jwt 토큰 인증을 위해 연결
const JWT_SECRET = process.env.JWT_SECRET; // .env 파일에서 시크릿키 가져옴

// 회원가입
exports.signup = async (req, res) => {
  try {
    // 프론트단에서 post로 요청 보낸 데이터들
    // 프론트에서는 입력한 비밀번호 값을 보내기 때문에 hashed 가 아닌 프론트에서 보낸 데이터값 그대로 넣어야함
    const {user_name, user_id, pwd, birth_date, tel} = req.body; // 클라이언트에서 post로 보낸 요청 데이터 (JSON 형태로)

    // userService에서 처리한 비즈니스 로직들에 대한 결과값을 result에 담음
    const result = await userService.signup(user_name, user_id, pwd, birth_date, tel);
  
    res.json(result); // 클라이언트에 JSON 형식으로 응답을 보내는 코드

  } catch (error) {
    res.json ({
      success: false,
      message: "controller 회원가입 에러"
    });
  }
}