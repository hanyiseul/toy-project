import {state} from "./state.js";

// 공통 기능 함수
export const common = {
 async dateState () {
     // 선택한 월 데이터 가져오기
    const {year, month} = state.date;
    const user_id = state.user.user_id;
    const response = await fetch(`/api/account/data?user_id=${user_id}&year=${year}&month=${month}`);
    const data = await response.json();
    return data;
  },
  async daySpend () {
    // 일별 소비금액 조회
    const {year, month} = state.date;
    const user_id = state.user.user_id;
    const response = await fetch(`/api/account/data?user_id=${user_id}&year=${year}&month=${month}`);
    const data = await response.json();
    if(data.success) {
      const daySpend = data.data;
      return daySpend;
    }
    console.log("daySpend 데이터:", data.dayAccount);
  }
}