import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { verify } from "@/api/authAPI.js";
import Layout from "@/layout/Layout";
import Login from "@/pages/Login/page"
import Signup from "@/pages/Signup/page"
import TodoList from "@/pages/TodoList/page"

function App() {
  // 새로고침시에도 로그인 유지
  const isLogin = useAuthStore((state) => state.isLogin);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  // 링크 이동
  const navigate = useNavigate();

  useEffect(() => {

    const checkLogin = async () => {
      try {
        const data = await verify(); // 토큰 검증 api

        if (!data.success) {
          logout();
          return;
        }
        
        login({ // 로그인 정보를 전역으로 상태 관리
          user: data.user,
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
        <Route
          path="/todoList"
          element={isLogin ? <TodoList /> : <Navigate to="/" />}
        />
      </Routes>
    </Layout>
  )
}

export default App
