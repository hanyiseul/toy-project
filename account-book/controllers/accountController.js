const accountService = require("../services/accountService.js");

exports.getAccountData = async (req, res) => {
  try {
    const { user_id, year, month } = req.query;

    const result = await accountService.getAccountData(user_id, year, month);

    res.json(result);

  } catch (error) {
    res.json({
      success: false,
      message: "데이터 로딩 실패"
    });
  }
};
