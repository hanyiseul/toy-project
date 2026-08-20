"use client";

import { useEffect, useState } from "react";
import {
  languages,
  translations,
  uiTranslations,
} from "../../data/translations";
import OnboardingScreen from "../../components/onboarding/OnboardingScreen";
import ProfileSetupScreen from "../../components/onboarding/ProfileSetupScreen";
import ReferenceCourseResult from "../../components/course/ReferenceCourseResult";
import AuthScreen from "../../components/auth/AuthScreen";
import { placeApi } from "../../services/placeApi";

const API = "http://localhost:4000/api";

const initialCoursePrefs = {
  transport: "walk",
  keywords: [],
  location: "",
  season: "summer",
  diet: "all",
};
const initialForm = {
  type: "foreign",
  country: "",
  age: "20대",
  gender: "비공개",
  visa: "관광 / 단기체류",
  matching: true,
  ...initialCoursePrefs,
};
function buildProfilePayload(form) {
  return {
    type: form.type,
    nationality: form.country,
    ageRange: form.age,
    gender: form.gender,
    visa: form.visa,
    matching: form.matching,
    photoUrl: form.photoUrl,
    diet: form.diet,
    location: form.location,
  };
}
export default function HomePage() {
  const [lang, setLang] = useState("ko");
  const [screen, setScreen] = useState("landing");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [authUser, setAuthUser] = useState(null);
  const text = translations[lang];
  const goToHub = (user) =>
    setScreen(user?.profileComplete ? "main" : "profile-setup");
  const next = () => {
    if (screen === "landing") {
      if (!authUser) setScreen("auth");
      else goToHub(authUser);
    } else if (step < 6) setStep(step + 1);
    else setScreen("loading");
  };
  const back = () => {
    if (screen === "result") setScreen("main");
    else if (screen === "auth" || screen === "profile-setup") setScreen("landing");
    else if (screen === "onboarding") {
      if (step > 1) setStep(step - 1);
      else setScreen("main");
    } else setScreen("landing");
  };
  const reset = () => {
    setForm((current) => ({ ...current, ...initialCoursePrefs }));
    setStep(1);
    setScreen("main");
  };
  const logout = () => {
    fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
    setAuthUser(null);
    setForm(initialForm);
    setScreen("landing");
  };
  const completeProfileSetup = async () => {
    try {
      const result = await placeApi.saveProfile(buildProfilePayload(form));
      setAuthUser((current) => ({ ...current, profileComplete: result.profileComplete ?? true }));
    } catch {
      // keep user on the profile setup screen if the save failed
      return;
    }
    setScreen("main");
  };
  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => data?.user && setAuthUser(data.user))
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (screen === "onboarding" && step === 6) {
      placeApi.saveProfile(buildProfilePayload(form)).catch(() => {});
      const readyTimer = setTimeout(() => setScreen("loading"), 900);
      return () => clearTimeout(readyTimer);
    }
  }, [screen, step]);
  useEffect(() => {
    if (screen !== "loading") return;
    const timer = setInterval(
      () => setLoadingIndex((current) => (current + 1) % 4),
      650,
    );
    const finish = setTimeout(() => setScreen("result"), 2700);
    return () => {
      clearInterval(timer);
      clearTimeout(finish);
    };
  }, [screen]);
  return (
    <main className="reference-app">
      <header className="global-header">
        <button className="logo" onClick={() => setScreen("landing")}>
          <span>♥</span>
          {text.appName}
        </button>
        <label className="language-select">
          <select
            value={lang}
            aria-label={text.language}
            onChange={(event) => setLang(event.target.value)}
          >
            {languages.map((key) => (
              <option value={key} key={key}>
                {translations[key].flag} {translations[key].label}
              </option>
            ))}
          </select>
        </label>
      </header>
      {screen === "landing" && <Landing text={text} onStart={next} />}{" "}
      {screen === "auth" && (
        <AuthScreen
          onBack={back}
          onSuccess={(user) => {
            setAuthUser(user);
            goToHub(user);
          }}
        />
      )}{" "}
      {screen === "profile-setup" && (
        <ProfileSetupScreen
          text={text}
          form={form}
          setForm={setForm}
          onBack={back}
          onNext={completeProfileSetup}
        />
      )}{" "}
      {screen === "main" && (
        <MainScreen
          text={text}
          user={authUser}
          onStart={() => {
            setStep(1);
            setScreen("onboarding");
          }}
          onLogout={logout}
        />
      )}{" "}
      {screen === "onboarding" && (
        <OnboardingScreen
          step={step}
          text={text}
          lang={lang}
          form={form}
          setForm={setForm}
          onBack={back}
          onNext={next}
        />
      )}{" "}
      {screen === "loading" && (
        <LoadingScreen text={text} index={loadingIndex} />
      )}{" "}
      {screen === "result" && (
        <ReferenceCourseResult
          text={text}
          lang={lang}
          form={form}
          user={authUser}
          onBack={back}
          onReset={reset}
        />
      )}{" "}
    </main>
  );
}
function Landing({ text, onStart }) {
  return (
    <section className="landing">
      <div className="landing-heart">♥</div>
      <p className="landing-value">{text.heroValue}</p>
      <h1>{text.appName}</h1>
      <p className="landing-subtitle">{text.subtitle}</p>
      <div className="feature-grid">
        <Feature icon="🍽️" text={text.f1} />
        <Feature icon="🗺️" text={text.f2} />
        <Feature icon="🚶" text={text.f3} />
        <Feature icon="💝" text={text.f4} />
      </div>
      <button className="start-button" onClick={onStart}>
        {text.ctaFindCourse} <span>→</span>
      </button>
      <small className="powered">{text.poweredBy}</small>
    </section>
  );
}
function MainScreen({ text, user, onStart, onLogout }) {
  return (
    <section className="landing">
      <div className="landing-heart">♥</div>
      <p className="landing-value">
        <strong>{user?.nickname}</strong>
        {text.mainGreeting}
      </p>
      <h1>{text.appName}</h1>
      <p className="landing-subtitle">{text.mainSubtitle}</p>
      <button className="start-button" onClick={onStart}>
        {text.startCourseCta} <span>→</span>
      </button>
      <button className="auth-switch" onClick={onLogout}>
        {text.logoutLabel}
      </button>
    </section>
  );
}
function Feature({ icon, text }) {
  return (
    <div className="feature">
      <span>{icon}</span>
      <b>{text}</b>
    </div>
  );
}
function LoadingScreen({ text, index }) {
  const messages = [text.lm1, text.lm2, text.lm3, text.lm4];
  return (
    <section className="loading-screen">
      <div className="loading-heart">♥</div>
      <h2>{text.loadingTitle}</h2>
      <p>{messages[index]}</p>
      <div className="loading-track">
        <span style={{ width: `${(index + 1) * 25}%` }}></span>
      </div>
      <small>{index + 1} / 4</small>
    </section>
  );
}
