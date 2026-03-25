const accountModel = require("../models/accountModel.js");

exports.getAccountData = async (user_id, year, month) => {
  try {
    const result = await accountModel.getAccountData(user_id, year, month);
    console.log(result);
    if (!result || result.length === 0) {
      return {
        success: true,
        data: []
      };
    }

    return {
      success: true,
      data: result || []
    };
  } catch(error) {
    console.error(error);
    
    return {
      success: false,
      message: "데이터 로딩 실패"
    };
  }
}