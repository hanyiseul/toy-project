// accountController.js : model 호출, 요청 데이터 처리
// 요청(req)를 받아서 처리하고 응답(res)을 보내는 역할 => 결과를 받아서 프론트에 전달

const accountService = require("../services/accountService.js");

// 가계부 조회
exports.getAccountData = async (req, res) => {
  try {
    const { user_id, year, month } = req.query; // 요청 받은 정보

    const result = await accountService.getAccountData(user_id, year, month); 

    res.json(result);

  } catch (error) {
    res.json({
      success: false,
      message: "데이터 로딩 실패"
    });
  }
};

// 가계부 등록
exports.registAccount = async (req, res) => {
  try {
    const user_id = req.user.user_id; // 현재 로그인 되어있는 계정 아이디 정보
    const { type, category, amount, memo, date } = req.body;

    const result = await accountService.registerAccoun (user_id, type, category, amount, memo, date);

    res.json(result);

  } catch (error) {
    res.json({
      success: false,
      message: "controller 등록 실패"
    });
  }
};
