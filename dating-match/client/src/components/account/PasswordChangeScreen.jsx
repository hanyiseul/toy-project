import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { API_URL as API } from "../../config/api";
import { authFetch } from "../../services/authFetch";

export default function PasswordChangeScreen({ onBack }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    const response = await authFetch(`${API}/auth/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) return setError(data.message || "변경에 실패했습니다.");
    setDone(true);
  };

  return (
    <section className="flow-screen">
      <div className="flow-header">
        <button onClick={onBack}>
          <ArrowLeft size={21} />
        </button>
        <span>비밀번호 변경</span>
        <span />
      </div>
      <div className="flow-content">
        {done ? (
          <div className="auth-result">
            <p>비밀번호가 변경됐어요.</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={submit}>
            <label>
              <span>
                <LockKeyhole size={14} /> 현재 비밀번호
              </span>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
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
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="8자 이상"
              />
            </label>
            <label>
              <span>
                <LockKeyhole size={14} /> 새 비밀번호 확인
              </span>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </label>
            {error && <p className="auth-error">{error}</p>}
            <button className="auth-submit" type="submit">
              변경하기
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
