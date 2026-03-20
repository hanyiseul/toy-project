// service.js : 실제 비즈니스 로직 처리

const model = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

exports.join = async (user_name, user_id, pwd, birth_date, tel) => {

  const result = await model.join(
    user_name,
    user_id,
    pwd,
    birth_date,
    tel
  );

  if (result.affectedRows === 1) {
    return {
      success: true,
      message: "회원가입 성공"
    };
  }

  return {
    success: false,
    message: "회원가입 실패"
  };
};