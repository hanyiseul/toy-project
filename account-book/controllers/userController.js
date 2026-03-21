// userController.js : models 호출, 요청 데이터 처리
// 요청(req)을 받아서 처리하고 응답(res)을 보내는 역할 => 결과를 받아서 프론트에 전달

const userService = require("../services/useService.js");

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