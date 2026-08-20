import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const countries = [
  "🇺🇸 미국",
  "🇬🇧 영국",
  "🇯🇵 일본",
  "🇨🇳 중국",
  "🇹🇼 대만",
  "🇻🇳 베트남",
  "🇹🇭 태국",
  "🇵🇭 필리핀",
  "🇮🇩 인도네시아",
  "🇲🇾 말레이시아",
  "🇮🇳 인도",
  "🇵🇰 파키스탄",
  "🇫🇷 프랑스",
  "🇩🇪 독일",
  "🇨🇦 캐나다",
  "🇦🇺 호주",
];

export default function ProfileSetupScreen({ text, form, setForm, onBack, onNext }) {
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) update("photoUrl", URL.createObjectURL(file));
  };

  return (
    <section className="flow-screen">
      <div className="flow-header">
        <button onClick={onBack}>
          <ArrowLeft size={21} />
        </button>
        <span>{text.profileSetupTitle}</span>
        <span />
      </div>
      <div className="flow-content">
        <div className="flow-icon profile-preview">
          {form.photoUrl ? (
            <img src={form.photoUrl} alt="등록한 프로필 사진" />
          ) : (
            "♥"
          )}
        </div>
        <h2>{text.whoAreYou}</h2>
        <p>{text.whoAreYouSub}</p>
        <div className="choice-stack">
          <button
            className={form.type === "foreign" ? "choice selected" : "choice"}
            onClick={() => update("type", "foreign")}
          >
            <b>🌍</b>
            <span>
              <strong>{text.typeForeign}</strong>
              <small>{text.typeForeignDesc}</small>
            </span>
            {form.type === "foreign" && <Check />}
          </button>
          <button
            className={form.type === "korean" ? "choice selected" : "choice"}
            onClick={() => update("type", "korean")}
          >
            <b>🇰🇷</b>
            <span>
              <strong>{text.typeKorean}</strong>
              <small>{text.typeKoreanDesc}</small>
            </span>
            {form.type === "korean" && <Check />}
          </button>
        </div>
        <div className="form-grid">
          <label>
            {text.country}
            <select
              value={form.country}
              onChange={(event) => update("country", event.target.value)}
            >
              <option value="">선택해주세요</option>
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </label>
          <label>
            {text.ageBand}
            <select
              value={form.age}
              onChange={(event) => update("age", event.target.value)}
            >
              <option>20대</option>
              <option>30대</option>
              <option>40대 이상</option>
            </select>
          </label>
          <label>
            {text.gender}
            <select
              value={form.gender}
              onChange={(event) => update("gender", event.target.value)}
            >
              <option>{text.genderOther}</option>
              <option>{text.genderMale}</option>
              <option>{text.genderFemale}</option>
            </select>
          </label>
          {form.type === "foreign" && (
            <label>
              {text.visa}
              <select
                value={form.visa}
                onChange={(event) => update("visa", event.target.value)}
              >
                <option>관광 / 단기체류</option>
                <option>워킹홀리데이</option>
                <option>유학 / 교환</option>
                <option>기타</option>
              </select>
            </label>
          )}
        </div>
        <label className="upload-box">
          ＋ {text.photoUpload}
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        <label className="switch-row">
          <input
            type="checkbox"
            checked={form.matching}
            onChange={(event) => update("matching", event.target.checked)}
          />
          <span>
            <strong>{text.matchingOpt}</strong>
            <small>{text.matchingOptDesc}</small>
          </span>
        </label>
      </div>
      <div className="flow-footer">
        <button className="next-button" onClick={onNext}>
          {text.profileDoneBtn}
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
