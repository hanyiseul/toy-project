import { ArrowRight, X } from "lucide-react";
import { placeApi } from "../../services/placeApi";

export default function ProfileModal({ onClose, onSaved }) {
  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profile = Object.fromEntries(formData.entries());
    try {
      await placeApi.saveProfile(profile);
      onSaved();
      onClose();
    } catch {
      onSaved("프로필 저장에 실패했어요.");
    }
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="signup-modal"
        onClick={(event) => event.stopPropagation()}
        onSubmit={submit}
      >
        <button type="button" className="close-button" onClick={onClose}>
          <X size={18} />
        </button>
        <p className="section-kicker">START HERE</p>
        <h2>나를 소개해주세요</h2>
        <p>한국인과 외국인 중 어떤 만남을 원하는지 알려주세요.</p>
        <label>
          나는{" "}
          <select name="type">
            <option value="foreigner">외국인</option>
            <option value="korean">한국인</option>
          </select>
        </label>
        <label>
          국적{" "}
          <input
            name="nationality"
            placeholder="예: 일본, 미국, 인도"
            required
          />
        </label>
        <div className="two-inputs">
          <label>
            연령대{" "}
            <select name="ageRange">
              <option>20대</option>
              <option>30대</option>
              <option>40대 이상</option>
            </select>
          </label>
          <label>
            성별{" "}
            <select name="gender">
              <option>선택 안 함</option>
              <option>여성</option>
              <option>남성</option>
            </select>
          </label>
        </div>
        <label>
          보유 비자{" "}
          <select name="visa">
            <option>관광 / 단기체류</option>
            <option>워킹홀리데이</option>
            <option>유학 / 교환</option>
            <option>기타</option>
          </select>
        </label>
        <label className="check-label">
          <input type="checkbox" defaultChecked /> 매칭 추천을 받아볼게요
        </label>
        <button className="primary-button" type="submit">
          프로필 시작하기 <ArrowRight size={17} />
        </button>
      </form>
    </div>
  );
}
