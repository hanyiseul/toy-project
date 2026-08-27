import { ArrowLeft, ArrowRight, Cake, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { API_URL as API } from "../../config/api";
import { setToken } from "../../services/authToken";

export default function AuthScreen({ onBack, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
    birthDate: "",
  });
  const [findForm, setFindForm] = useState({ nickname: "", birthDate: "" });
  const [resetForm, setResetForm] = useState({
    email: "",
    nickname: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [foundEmails, setFoundEmails] = useState(null);
  const [resetDone, setResetDone] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setFoundEmails(null);
    setResetDone(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    const response = await fetch(`${API}/auth/${mode}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) return setError(data.message || "인증에 실패했습니다.");
    setToken(data.token);
    onSuccess(data.user);
  };

  const submitFindEmail = async (event) => {
    event.preventDefault();
    setError("");
    setFoundEmails(null);
    const response = await fetch(`${API}/auth/find-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(findForm),
    });
    const data = await response.json();
    if (!response.ok) return setError(data.message || "조회에 실패했습니다.");
    setFoundEmails(data.emails || []);
  };

  const submitResetPassword = async (event) => {
    event.preventDefault();
    setError("");
    const response = await fetch(`${API}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resetForm),
    });
    const data = await response.json();
    if (!response.ok) return setError(data.message || "재설정에 실패했습니다.");
    setResetDone(true);
  };

  return (
    <section className="auth-screen">
      <button className="auth-back" onClick={onBack}>
        <ArrowLeft size={20} />
      </button>
      <div className="auth-mark">♥</div>
      <p className="auth-kicker">MIGYEOLCHU ACCOUNT</p>

      {(mode === "login" || mode === "signup") && (
        <>
          <h2>{mode === "login" ? "다시 만나요" : "처음 오셨나요?"}</h2>
          <p className="auth-description">
            {mode === "login"
              ? "로그인하고 나의 데이트와 매칭을 관리하세요."
              : "계정을 만들고 진짜 한국인과의 데이트를 시작하세요."}
          </p>
          <form className="auth-form" onSubmit={submit}>
            {mode === "signup" && (
              <label>
                <span>
                  <User size={14} /> 닉네임
                </span>
                <input
                  value={form.nickname}
                  onChange={(event) => setForm({ ...form, nickname: event.target.value })}
                  placeholder="화면에 표시할 이름"
                />
              </label>
            )}
            <label>
              <span>
                <Mail size={14} /> 이메일
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="you@example.com"
              />
            </label>
            {mode === "signup" && (
              <label>
                <span>
                  <Cake size={14} /> 생년월일
                </span>
                <input
                  type="date"
                  required
                  value={form.birthDate}
                  onChange={(event) => setForm({ ...form, birthDate: event.target.value })}
                />
              </label>
            )}
            <label>
              <span>
                <LockKeyhole size={14} /> 비밀번호
              </span>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="8자 이상"
              />
            </label>
            {error && <p className="auth-error">{error}</p>}
            <button className="auth-submit" type="submit">
              {mode === "login" ? "로그인" : "회원가입"}
              <ArrowRight size={17} />
            </button>
          </form>
          <button
            className="auth-switch"
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "계정이 없나요? 회원가입" : "이미 계정이 있나요? 로그인"}
          </button>
          {mode === "login" && (
            <div className="auth-find-links">
              <button onClick={() => switchMode("find-email")}>이메일 찾기</button>
              <span>·</span>
              <button onClick={() => switchMode("reset-password")}>비밀번호 찾기</button>
            </div>
          )}
        </>
      )}

      {mode === "find-email" && (
        <>
          <h2>이메일 찾기</h2>
          <p className="auth-description">
            가입할 때 등록한 닉네임과 생년월일을 입력해주세요.
          </p>
          <form className="auth-form" onSubmit={submitFindEmail}>
            <label>
              <span>
                <User size={14} /> 닉네임
              </span>
              <input
                required
                value={findForm.nickname}
                onChange={(event) =>
                  setFindForm({ ...findForm, nickname: event.target.value })
                }
                placeholder="가입 시 등록한 닉네임"
              />
            </label>
            <label>
              <span>
                <Cake size={14} /> 생년월일
              </span>
              <input
                type="date"
                required
                value={findForm.birthDate}
                onChange={(event) =>
                  setFindForm({ ...findForm, birthDate: event.target.value })
                }
              />
            </label>
            {error && <p className="auth-error">{error}</p>}
            {foundEmails && (
              <div className="auth-result">
                {foundEmails.length ? (
                  <>
                    <p>일치하는 이메일이에요:</p>
                    {foundEmails.map((email) => (
                      <strong key={email}>{email}</strong>
                    ))}
                  </>
                ) : (
                  <p>일치하는 계정을 찾을 수 없어요.</p>
                )}
              </div>
            )}
            <button className="auth-submit" type="submit">
              이메일 찾기
              <ArrowRight size={17} />
            </button>
          </form>
          <button className="auth-switch" onClick={() => switchMode("login")}>
            로그인으로 돌아가기
          </button>
        </>
      )}

      {mode === "reset-password" && (
        <>
          <h2>비밀번호 찾기</h2>
          <p className="auth-description">
            이메일과 닉네임을 확인하면 바로 새 비밀번호를 설정할 수 있어요.
          </p>
          {resetDone ? (
            <div className="auth-result">
              <p>비밀번호가 재설정됐어요. 새 비밀번호로 로그인해주세요.</p>
            </div>
          ) : (
            <form className="auth-form" onSubmit={submitResetPassword}>
              <label>
                <span>
                  <Mail size={14} /> 이메일
                </span>
                <input
                  type="email"
                  required
                  value={resetForm.email}
                  onChange={(event) =>
                    setResetForm({ ...resetForm, email: event.target.value })
                  }
                  placeholder="you@example.com"
                />
              </label>
              <label>
                <span>
                  <User size={14} /> 닉네임
                </span>
                <input
                  required
                  value={resetForm.nickname}
                  onChange={(event) =>
                    setResetForm({ ...resetForm, nickname: event.target.value })
                  }
                  placeholder="가입 시 등록한 닉네임"
                />
              </label>
              <label>
                <span>
                  <LockKeyhole size={14} /> 새 비밀번호
                </span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={resetForm.newPassword}
                  onChange={(event) =>
                    setResetForm({ ...resetForm, newPassword: event.target.value })
                  }
                  placeholder="8자 이상"
                />
              </label>
              {error && <p className="auth-error">{error}</p>}
              <button className="auth-submit" type="submit">
                비밀번호 재설정
                <ArrowRight size={17} />
              </button>
            </form>
          )}
          <button className="auth-switch" onClick={() => switchMode("login")}>
            로그인으로 돌아가기
          </button>
        </>
      )}
    </section>
  );
}
