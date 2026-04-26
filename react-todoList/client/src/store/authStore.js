// 로그인 상태를 전역으로 관리하는 공간

import { create } from "zustand";
import { logout as logoutAPI } from "../api/userAPI";

// zustand - create : 스토어(전역상태)를 만드는 함수
// zustand - set : 전역 상태를 변경하는 함수

export const useAuthStore = create((set) => { // 전역 상태 공간 생성
  return {
    user: null, // 로그인한 유저 정보
    isLogin: false, // 로그인 여부 체크

    login: ({user}) => set({user, isLogin: true}),
    logout: async () => {
      await logoutAPI(); // 로그아웃 api 호출
      set({ user: null, isLogin: false }); // 상태관리
    },
  }

});

/**
 * create((set) => {
 *  return {
 *    상태,
 *    함수명: (data => set({...})) - 상태 바꾸는 함수 
 *  }
 * });
 */