import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { signup } from "@/api/userAPI";
import { checkId } from "../../api/userAPI";
import { useRef } from "react";

const Signup = () => {
  // 입력값 상태 변화 제어
  const [name, setName] = useState("");
  const [user_id, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [isChkId, setIsChkId] = useState(false);
  const [idMessage, setIdMessage] = useState("");

  // 돔 접근 가능 참조값
  const pwdRef = useRef(null);
  const idRef = useRef(null);

  // 링크 이동
  const navigate = useNavigate();

  // api 처리
  const handleSignup = async() => {
    // 비밀번호 확인 조건문
    if(pwd !== pwdCheck) {
      pwdRef.current.focus();
      return alert("비밀번호가 일치하지 않습니다.")
    }
    
    // 만일 아이디 중복 체크가 안되었을 경우
    if(!isChkId) { // isIdChecked가 false일 경우
      return alert("아이디 중복 확인 해주세요");
    }

    try {
      await signup(name, user_id, pwd); // 회원가입 api 함수에 요청 데이터 넣기
      alert("회원가입 성공");
      navigate("/"); // 회원가입 성공시 로그인 페이지로 이동
    } catch (err) {
      alert("회원가입 실패", err);
    }
  }

  // 아이디 중복 체크 함수
  const handleCheckId = async() => {

    try {
      const data = await checkId(user_id); // 아이디 중복 체크를 위한 아이디 체크 api 요청 전송
      if(data.exists) {
        idRef.current.focus();
        setIdMessage("이미 존재하는 아이디입니다.");
        setIsChkId(false);
      } else { // 아이디가 존재하지 않는다면
        setIdMessage("사용 가능합니다.");
        setIsChkId(true);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("아이디 중복 체크 실패했습니다. 다시 확인해주세요");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        회원가입
      </h1>

      <div className="flex flex-col gap-3">
        <Input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="아이디"
            value={user_id}
            ref={idRef}
            onChange={(e) => {
              setUserId(e.target.value);
              setIsChkId(false);
              setIdMessage("");
            }}
          />
          <Button
            size="md"
            className="whitespace-nowrap"
            onClick={handleCheckId}
          >
            확인
          </Button>
        </div>
        {idMessage && (
          <p className={`text-xs ml-1 ${isChkId ? "text-green-500" : "text-red-500"}`}>
            {idMessage}
          </p>
        )}
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
          ref={pwdRef}
          onChange={(e) => setPwdCheck(e.target.value)}
        />
        <Button size="lg" onClick={handleSignup}>
          회원가입
        </Button>
      </div>

      <div className="mt-5 text-sm text-gray-500 text-center">
        이미 계정이 있으신가요?{" "}
        <Link to="/" className="text-purple-500 font-medium hover:underline">
          로그인
        </Link>
      </div>
    </>
  );
};

export default Signup;