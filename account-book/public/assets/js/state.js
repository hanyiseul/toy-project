// 공통 상태 관리 함수
export const state = {
  user: null,
  date: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  },
};