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

exports.checkId = async (req, res) => {
  try {
    // req.query : URL 뒤에 붙은 데이터(쿼리 파라미터)를 가져오는 객체
    const {user_id} = req.query;

    // userSerive.js에서 처리한 checkid 함수에 user_id값을 담아 result에 저장
    const result = await userService.checkId(user_id);
    res.json(result);
  } catch(error) {
    res.json({
      success: false,
      messages: "아이디 중복체크 실패"
    })
  }
}

exports.login = async (req, res) => {
  try {
    const {user_id, pwd} = req.body;

    const result = await userService.login(user_id, pwd)
    res.json(result);

  } catch(error) { // 데이터 처리 실패시
    res.json({
      success: false,
      message: "controller 로그인 실패"
    })
  }
}

// 로그인 - JWT 검증
exports.verify = (req, res) => {
  try {
    const authHeader = req.headers['authorization']; // 클라이언트가 보낸 authorization header
    const token = authHeader && authHeader.split(" ")[1]; // authorization 헤더에서 Bearer를 제거하고 JWT 토큰만 가져오는 코드

    if(!token) return res.josn({success: false});

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.json({ success: false });
      res.json({ success: true, user: decoded }); // 유효하면 해독된 유저 정보 응답
    });
  } catch (err) { // 데이터 처리 실패 시
    res.json({
      success: false,
      message: "로그인 실패"
    });
  }
}