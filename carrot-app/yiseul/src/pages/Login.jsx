import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  return (
    <form action="" className="login">
      <Input label="아이디"/>
      <Input label="비밀번호" type="password"/>
      <Button text="로그인"/>
    </form>
  )
}
