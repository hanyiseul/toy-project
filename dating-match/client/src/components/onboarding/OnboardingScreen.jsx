import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import {
  keywordLabels,
  keywordMeta,
  seasonDetails,
  uiTranslations,
} from "../../data/translations";

export default function OnboardingScreen({
  step,
  text,
  lang,
  form,
  setForm,
  onBack,
  onNext,
}) {
  const labels = keywordLabels[lang];
  const ui = uiTranslations[lang];
  const seasonText = seasonDetails[lang];
  const selected = form.keywords || [];
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const toggleKeyword = (id) =>
    update(
      "keywords",
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : selected.length < 3
          ? [...selected, id]
          : selected,
    );
  return (
    <section className="flow-screen">
      <div className="flow-header">
        <button onClick={onBack}>
          <ArrowLeft size={21} />
        </button>
        <span>{text.courseSetupTitle}</span>
        <span className="step-count">{step} / 6</span>
      </div>
      <div className="flow-content">
        {step === 1 && (
          <OptionStep title={text.transportTitle} sub={text.transportSub}>
            <button
              className={
                form.transport === "walk" ? "big-option selected" : "big-option"
              }
              onClick={() => update("transport", "walk")}
            >
              🚶
              <span>
                <strong>{text.walk}</strong>
                <small>{text.walkSub}</small>
              </span>
            </button>
            <button
              className={
                form.transport === "drive"
                  ? "big-option selected"
                  : "big-option"
              }
              onClick={() => update("transport", "drive")}
            >
              🚗
              <span>
                <strong>{text.drive}</strong>
                <small>{text.driveSub}</small>
              </span>
            </button>
          </OptionStep>
        )}
        {step === 2 && (
          <>
            <h2 className="pre-line">{text.keywordsTitle}</h2>
            <p>{text.keywordsSub}</p>
            <div className="keyword-grid">
              {keywordMeta.map(([icon, id], index) => (
                <button
                  key={id}
                  className={
                    selected.includes(id) ? "keyword selected" : "keyword"
                  }
                  onClick={() => toggleKeyword(id)}
                >
                  <span>{icon}</span>
                  {labels[index]}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2>{text.locationTitle}</h2>
            <p>{text.locationSub}</p>
            <div className="location-input">
              <MapPin size={18} />
              <input
                value={form.location}
                onChange={(event) => update("location", event.target.value)}
                placeholder={text.locationPh}
              />
            </div>
            <p className="small-title">{text.popularAreas}</p>
            <div className="area-chips">
              {["홍대", "강남", "성수동", "이태원", "서촌"].map((area) => (
                <button key={area} onClick={() => update("location", area)}>
                  {area}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 4 && (
          <OptionStep title={text.seasonTitle} sub={text.seasonSub}>
            <button
              className={
                form.season === "summer" ? "big-option selected" : "big-option"
              }
              onClick={() => update("season", "summer")}
            >
              ☀️
              <span>
                <strong>{text.summer}</strong>
                <small>{seasonText.summer}</small>
              </span>
            </button>
            <button
              className={
                form.season === "winter" ? "big-option selected" : "big-option"
              }
              onClick={() => update("season", "winter")}
            >
              ❄️
              <span>
                <strong>{text.winter}</strong>
                <small>{seasonText.winter}</small>
              </span>
            </button>
          </OptionStep>
        )}
        {step === 5 && (
          <OptionStep title={text.dietaryTitle} sub={text.dietaryAuto}>
            <button
              className={
                form.diet === "halal" ? "big-option selected" : "big-option"
              }
              onClick={() => update("diet", "halal")}
            >
              ☪️
              <span>
                <strong>{text.halal}</strong>
                <small>이슬람 식단을 고려해요</small>
              </span>
            </button>
            <button
              className={
                form.diet === "vegetarian"
                  ? "big-option selected"
                  : "big-option"
              }
              onClick={() => update("diet", "vegetarian")}
            >
              🥗
              <span>
                <strong>{text.vegetarian}</strong>
                <small>채식 중심으로 추천해요</small>
              </span>
            </button>
            <button
              className={
                form.diet === "all" ? "big-option selected" : "big-option"
              }
              onClick={() => update("diet", "all")}
            >
              🍽️
              <span>
                <strong>{text.dietaryNone}</strong>
              </span>
            </button>
          </OptionStep>
        )}
        {step === 6 && (
          <div className="ready-step">
            <div className="flow-icon">✨</div>
            <h2>{ui.readyTitle}</h2>
            <p>{ui.readyText}</p>
          </div>
        )}
      </div>
      {step < 6 && (
        <div className="flow-footer">
          <button className="next-button" onClick={onNext}>
            {text.continueBtn}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}

function OptionStep({ title, sub, children }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{sub}</p>
      <div className="big-options">{children}</div>
    </>
  );
}
