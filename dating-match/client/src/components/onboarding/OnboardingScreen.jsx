import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { keywordLabels, keywordMeta, uiTranslations } from "../../data/translations";

const areas = ["홍대", "강남", "성수동", "이태원", "서촌"];
const cuisines = [
  ["korean", "🍚"],
  ["western", "🍝"],
  ["japanese", "🍣"],
  ["chinese", "🥟"],
  ["southeast_asian", "🍜"],
  ["middle_eastern", "🥙"],
];

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
  const cuisineLabel = {
    korean: text.cuisineKorean,
    western: text.cuisineWestern,
    japanese: text.cuisineJapanese,
    chinese: text.cuisineChinese,
    southeast_asian: text.cuisineSoutheastAsian,
    middle_eastern: text.cuisineMiddleEastern,
  };
  return (
    <section className="flow-screen">
      <div className="flow-header">
        <button onClick={onBack}>
          <ArrowLeft size={21} />
        </button>
        <span>{text.courseSetupTitle}</span>
        <span className="step-count">{step} / 4</span>
      </div>
      <div className="flow-content">
        {step === 1 && (
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
              {areas.map((area) => (
                <button key={area} onClick={() => update("location", area)}>
                  {area}
                </button>
              ))}
            </div>
            <p className="small-title">{text.transportInline}</p>
            <div className="big-options">
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
                  form.transport === "drive" ? "big-option selected" : "big-option"
                }
                onClick={() => update("transport", "drive")}
              >
                🚗
                <span>
                  <strong>{text.drive}</strong>
                  <small>{text.driveSub}</small>
                </span>
              </button>
            </div>
          </>
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
            <p className="small-title">{text.styleTitle}</p>
            <div className="big-options">
              <button
                className={
                  form.stylePref === "indoor" ? "big-option selected" : "big-option"
                }
                onClick={() => update("stylePref", "indoor")}
              >
                🏠
                <span>
                  <strong>{text.indoorPref}</strong>
                </span>
              </button>
              <button
                className={
                  form.stylePref === "outdoor" ? "big-option selected" : "big-option"
                }
                onClick={() => update("stylePref", "outdoor")}
              >
                🌳
                <span>
                  <strong>{text.outdoorPref}</strong>
                </span>
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2>{text.cuisineTitle}</h2>
            <p>{text.cuisineSub}</p>
            <div className="keyword-grid">
              {cuisines.map(([id, icon]) => (
                <button
                  key={id}
                  className={form.cuisine === id ? "keyword selected" : "keyword"}
                  onClick={() => update("cuisine", id)}
                >
                  <span>{icon}</span>
                  {cuisineLabel[id]}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 4 && (
          <div className="ready-step">
            <div className="flow-icon">✨</div>
            <h2>{ui.readyTitle}</h2>
            <p>{ui.readyText}</p>
          </div>
        )}
      </div>
      {step < 4 && (
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
