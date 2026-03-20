// userController.js : models 호출, 요청 데이터 처리

const userService = require("../service/useService.js");

// 회원가입
exports.join = async (req, res) => {
  try {
    const {user_name, user_id, pwd, birth_date, tel} = req.body;

    const result = await userService.join(
      user_name,
      user_id,
      pwd,
      birth_date,
      tel
    );

    res.json(result);
  } catch (err) {
    res.json({
      success: false,
      message: "회원가입 실패"
    });
  }
}

/**
 * 
 * 회원가입 실패 유형별로 처리해보기
 */