import { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link } from 'react-router-dom';

const Login = () => {
  const [user_id, setUserId] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold mb-8">로그인</h1>
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
          <Button> 로그인</Button>
        </div>
        <Link to="/signup" className="mt-6 text-sm text-gray-500 flex justify-center">회원가입 </Link>
      </div>
    </div>
  );
};

export default Login;