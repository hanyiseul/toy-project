import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { verify } from "@/api/authAPI.js";
import Layout from "@/layout/Layout";
import Login from "@/pages/Login/page"
import Signup from "@/pages/Signup/page"
import TodoList from "@/pages/TodoList/page"

function App() {

  // 새로고침시에도 로그인 유지
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  // 링크 이동
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token"); // 로컬스토리지에 토큰 정보를 담고
      if(!token) return; // 토큰 정보 없으면 종료 (로그아웃 상태)

      try {
        const data = await verify(token); // 토큰 검증 api
        login({ // 로그인 정보를 전역으로 상태 관리
          user: data.user,
          token
        });
        navigate("/todoList");
      } catch (error) {
        console.error("유지 실패", error);
        logout();
        navigate("/");
      }
    }
    checkLogin();
  }, []); // 컴포넌트 최초 실행시 한번만 실행

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todoList" element={<TodoList />} />
      </Routes>
    </Layout>
  )
}

export default App
