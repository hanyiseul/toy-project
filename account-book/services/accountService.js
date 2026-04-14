// 쿼리문 연결
const accountModel = require("../models/accountModel.js");

// index 가계부 조회
exports.getAccountData = async (user_id, year, month) => {
  try {
    const result = await accountModel.getAccountData(user_id, year, month);

    // 결과값이 없거나, 결과가 0일 경우 빈배열 반환
    if (!result || result.length === 0) {
      return {
        success: true,
        data: []
      };
    }

    // 결과값이 있을 경우 결과값 반환
    return {
      success: true,
      data: result
    };
  } catch(error) {
    console.error(error);
    
    return {
      success: false,
      message: "데이터 로딩 실패"
    };
  }
}

// 가계부 등록
exports.registAccount =  async (user_id, amount, memo, category, type, create_at) => {

  try {
    const result = await accountModel.registAccount(user_id, amount, memo, category, type, create_at);

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("service error", error);
    return {
      success: false,
      data: "가계부 등록 실패"
    }
  }
}

// 가계부 삭제
exports.deleteAccount = async (id) => {
  try {
    const result = await accountModel.deleteAccount(id);
    return {
      success: true
    }
  } catch (error) {
    console.error("service error", error);
    return {
      success: false,
      data: "가계부 삭제 실패"
    }
  }
}

// 가계부 수정
exports.updateAccount = async (id, data) => {
  try {
    const result = await accountModel.updateAccount(id, data);

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("service error", error);
    return {
      success: false,
      message: "가계부 수정 실패"
    };
  }
};

// 상세 조회
exports.getAccountDetail = async (id) => {
  const result = await accountModel.getAccountDetail(id);
  return {
    success: true,
    data: result[0]
  };
};