import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";
import { login as loginAPI } from "@/api/userAPI";
import Input from "@/components/Input";
import Button from "@/components/Button";

const Login = () => {
  // 로그인 입력값 상태 제어 
  const [user_id, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  // 링크 이동
  const navigate = useNavigate();

  // 로그인 기능 구현
  // state: useAuthStore의 현재 상태값 묶음 (전역상태로 관리)
  const setAuth = useAuthStore((state) => state.login); // useAuthStore에서 login 꺼내옴

  // 로그인 처리
  const handleLogin = async() => {
    try {
      const data = await loginAPI(user_id, pwd); // 로그인 api 함수에 요청 데이터 넣기
      
      // 전역으로 관리할 데이터 저장
      setAuth({
        user: data.user, // 계정 정보
        token: data.token, // 토큰 값 저장
      });

      // localStorage 저장
      localStorage.setItem("token", data.token);
      console.log("login data:", data);
      console.log("store user:", data.user);
      navigate("/todoList"); // 로그인 성공시 해당 페이지로 이동
    } catch (err) {
      alert("로그인 실패", err);
    }
  }
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">로그인</h1>

      <div className="flex flex-col gap-3">
        <Input
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디"
        />
        <Input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="비밀번호"
        />

        <Button size="lg" onClick={handleLogin}>로그인</Button>
      </div>

      <Link
        to="/signup"
        className="mt-5 text-sm text-gray-500 flex justify-center hover:text-purple-500"
      >
        회원가입
      </Link>
    </>
  );
};

export default Login;