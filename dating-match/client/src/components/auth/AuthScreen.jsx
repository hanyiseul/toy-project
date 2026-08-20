import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";

const API = "http://localhost:4000/api";

export default function AuthScreen({ onBack, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", nickname: "" });
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    const response = await fetch(`${API}/auth/${mode}`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    if (!response.ok) return setError(data.message || "인증에 실패했습니다.");
    onSuccess(data.user);
  };
  return <section className="auth-screen"><button className="auth-back" onClick={onBack}><ArrowLeft size={20} /></button><div className="auth-mark">♥</div><p className="auth-kicker">MIGYEOLCHU ACCOUNT</p><h2>{mode === "login" ? "다시 만나요" : "처음 오셨나요?"}</h2><p className="auth-description">{mode === "login" ? "로그인하고 나의 데이트와 매칭을 관리하세요." : "계정을 만들고 진짜 한국인과의 데이트를 시작하세요."}</p><form className="auth-form" onSubmit={submit}>{mode === "signup" && <label>닉네임<input value={form.nickname} onChange={(event) => setForm({ ...form, nickname: event.target.value })} placeholder="화면에 표시할 이름" /></label>}<label><span><Mail size={14} /> 이메일</span><input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><label><span><LockKeyhole size={14} /> 비밀번호</span><input type="password" required minLength={8} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="8자 이상" /></label>{error && <p className="auth-error">{error}</p>}<button className="auth-submit" type="submit">{mode === "login" ? "로그인" : "회원가입"}<ArrowRight size={17} /></button></form><button className="auth-switch" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>{mode === "login" ? "계정이 없나요? 회원가입" : "이미 계정이 있나요? 로그인"}</button></section>;
}
