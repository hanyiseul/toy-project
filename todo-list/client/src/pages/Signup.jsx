import { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [user_id, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold mb-8">회원가입</h1>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              className="flex-3"
              placeholder="아이디"
              value={user_id}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
            <Button className="flex-1">확인</Button>
          </div>
          <Input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={pwdCheck}
            onChange={(e) => setPwdCheck(e.target.value)}
          />
          <Button>회원가입</Button>
        </div>
        <div className="mt-6 text-sm text-gray-500 text-center">
          이미 계정이 있으신가요?{" "}
          <Link to="/" className="text-gray-900 font-medium">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;