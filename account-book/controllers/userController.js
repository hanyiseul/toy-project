// userController.js : models 호출, 요청 데이터 처리
// 요청(req)을 받아서 처리하고 응답(res)을 보내는 역할 => 결과를 받아서 프론트에 전달

const userService = require("../services/useService.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "my_super_secret_key";

// 회원가입
exports.signup = async (req, res) => {
  try {
    // 프론트단에서 요청 보낸 데이터들
    const {user_name, user_id, user_pwd, birth_date, tel} = req.body; // req.body : 클라이언트에서 보낸 요청 데이터 (JSON 형태로)

    const result = await userService.signup(
      user_name,
      user_id,
      user_pwd,
      birth_date,
      tel
    );

    res.json(result); // 클라이언트에 JSON 형식으로 응답을 보내는 코드
  } catch (error) { // 데이터 처리 실패 시
    res.json({
      success: false,
      message: "회원가입 실패"
    });
  }
}

// 회원가입 - 아이디 중복 체크
exports.checkId = async (req, res) => {
  try {
    console.log(req.query)

    // req.query : URL 뒤에 붙은 데이터(쿼리 파라미터)를 가져오는 객체
    const {user_id} = req.query
    const result = await userService.checkId(user_id);
    res.json(result);
  } catch (error) { // 데이터 처리 실패시
    res.json({
      success: false,
      message: "회원가입 실패"
    });
  }
}

// 로그인
exports.login = async (req, res) => {
  try {
    const {user_id, user_pwd} = req.body;

    const result = await userService.login(user_id, user_pwd);
    res.json(result);

  } catch (error) { // 데이터 처리 실패 시
    res.json({
      success: false,
      message: "로그인 실패"
    });
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