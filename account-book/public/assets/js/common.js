import {state} from "./state.js";

// 공통 기능 함수
export const common = {
  async dateState () {
     // 선택한 월 데이터 가져오기
    const {year, month} = state.date;
    const user_id = state.user.user_id;
    const response = await fetch(`/api/account/data?user_id=${user_id}&year=${year}&month=${month}`);
    const data = await response.json();
    console.log("response data:", data);
    if(data.success){

      const {MaxCategory, totalSpend} = data.data;
      
      console.log("MaxCategory",MaxCategory)
      console.log("totalSpend",totalSpend)

      document.querySelector(".category").textContent = MaxCategory ?? "없음";
      document.querySelector(".spend_data").textContent = totalSpend ?? 0;

    }
  }
}