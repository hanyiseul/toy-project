"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  languages,
  translations,
  uiTranslations,
} from "../../data/translations";
import OnboardingScreen from "../../components/onboarding/OnboardingScreen";
import ProfileSetupScreen from "../../components/onboarding/ProfileSetupScreen";
import ReferenceCourseResult from "../../components/course/ReferenceCourseResult";
import AuthScreen from "../../components/auth/AuthScreen";
import InteractionPanel from "../../components/interaction/InteractionPanel";
import PasswordChangeScreen from "../../components/account/PasswordChangeScreen";
import { placeApi } from "../../services/placeApi";
import { buildProfilePayload } from "../../utils/buildProfilePayload";
import { disconnectSocket, getSocket } from "../../services/socket";
import { API_URL as API } from "../../config/api";
import { authFetch } from "../../services/authFetch";
import { setToken } from "../../services/authToken";

const notificationToastText = {
  match_request: "새로운 매칭 신청이 도착했어요.",
  match_accepted: "매칭 신청이 수락됐어요!",
  match_rejected: "매칭 신청이 거절됐어요.",
};

const initialCoursePrefs = {
  transport: "",
  keywords: [],
  location: "",
  stylePref: "",
  cuisine: "",
  matching: true,
  matchTarget: null,
};
const initialForm = {
  type: "foreign",
  country: "",
  age: "20대",
  gender: "비공개",
  visa: "관광 / 단기체류",
  ...initialCoursePrefs,
};
function mapMeToFormPatch(me, current) {
  return {
    type: me.userType || current.type,
    country:
      me.nationality && me.nationality !== "unknown"
        ? me.nationality
        : current.country,
    age: me.ageRange && me.ageRange !== "unknown" ? me.ageRange : current.age,
    gender: me.gender && me.gender !== "unknown" ? me.gender : current.gender,
    visa: me.visa || current.visa,
    photoUrl: me.photoUrl || current.photoUrl,
    location: me.location || current.location,
    cuisine: me.cuisinePreference || current.cuisine,
    matchTarget: me.matchTarget ?? current.matchTarget,
    matching: me.matchingEnabled ?? current.matching,
  };
}
export default function HomePage() {
  const [lang, setLang] = useState("ko");
  const [screen, setScreen] = useState("landing");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [authUser, setAuthUser] = useState(null);
  const [interactionOpen, setInteractionOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [toast, setToast] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const text = translations[lang];
  const goToHub = (user) =>
    setScreen(user?.profileComplete ? "main" : "profile-setup");
  const next = () => {
    if (screen === "landing") {
      if (!authUser) setScreen("auth");
      else goToHub(authUser);
    } else if (step < 4) setStep(step + 1);
    else setScreen("loading");
  };
  const back = () => {
    if (screen === "result") setScreen("main");
    else if (screen === "auth" || screen === "profile-setup") setScreen("landing");
    else if (screen === "onboarding") {
      if (step > 1) setStep(step - 1);
      else setScreen("main");
    } else if (screen === "profile-edit" || screen === "password-change") {
      setScreen("main");
    } else setScreen("landing");
  };
  const reset = () => {
    setForm((current) => ({ ...current, ...initialCoursePrefs }));
    setStep(1);
    setScreen("main");
  };
  const logout = () => {
    authFetch(`${API}/auth/logout`, { method: "POST" }).catch(() => {});
    setToken(null);
    disconnectSocket();
    setAuthUser(null);
    setForm(initialForm);
    setInteractionOpen(false);
    setNotificationCount(0);
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
  const openProfileEdit = async () => {
    setAccountMenuOpen(false);
    try {
      const response = await authFetch(`${API}/auth/me`);
      const data = await response.json();
      if (data?.user) {
        setForm((current) => ({ ...current, ...mapMeToFormPatch(data.user, current) }));
      }
    } catch {
      // fall back to whatever is already in `form`
    }
    setScreen("profile-edit");
  };
  useEffect(() => {
    authFetch(`${API}/auth/me`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data?.user) return;
        setAuthUser(data.user);
        setForm((current) => ({ ...current, ...mapMeToFormPatch(data.user, current) }));
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (!authUser) return;
    authFetch(`${API}/interaction/notifications`)
      .then((response) => response.json())
      .then((data) =>
        setNotificationCount(
          (data.notifications || []).filter(
            (notification) => !notification.isRead,
          ).length,
        ),
      )
      .catch(() => setNotificationCount(0));
  }, [authUser]);
  useEffect(() => {
    if (!authUser) return;
    const socket = getSocket();
    if (!socket) return;
    socket.connect();
    const handleNotification = (payload) => {
      if (payload?.type !== "match_rejected") {
        setNotificationCount((count) => count + 1);
      }
      setToast(notificationToastText[payload?.type] || "새 알림이 도착했어요.");
    };
    socket.on("notification:new", handleNotification);
    return () => socket.off("notification:new", handleNotification);
  }, [authUser]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!accountMenuOpen) return;
    const handleClickOutside = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountMenuOpen]);
  useEffect(() => {
    if (screen === "onboarding" && step === 4) {
      placeApi.saveProfile(buildProfilePayload(form)).catch(() => {});
      const readyTimer = setTimeout(() => setScreen("loading"), 2200);
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
        <div className="header-actions">
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
          {authUser && (
            <button
              className="notification-button"
              onClick={() => setInteractionOpen(true)}
              aria-label="매칭 신청 알림"
            >
              <Bell size={18} />
              {notificationCount > 0 && (
                <span className="notification-dot">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          )}
          {authUser && (
            <div className="account-menu" ref={accountMenuRef}>
              <button
                className="account-menu-trigger"
                onClick={() => setAccountMenuOpen((open) => !open)}
              >
                {authUser.nickname}
                <ChevronDown size={14} />
              </button>
              {accountMenuOpen && (
                <div className="account-menu-list">
                  <button onClick={openProfileEdit}>프로필 수정</button>
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      setScreen("password-change");
                    }}
                  >
                    비밀번호 변경
                  </button>
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      logout();
                    }}
                  >
                    {text.logoutLabel}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      {toast && <div className="app-toast">{toast}</div>}
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
      {screen === "profile-edit" && (
        <ProfileSetupScreen
          text={text}
          form={form}
          setForm={setForm}
          onBack={back}
          onNext={completeProfileSetup}
        />
      )}{" "}
      {screen === "password-change" && <PasswordChangeScreen onBack={back} />}{" "}
      {screen === "main" && (
        <MainScreen
          text={text}
          user={authUser}
          onStart={() => {
            setForm((current) => ({ ...current, ...initialCoursePrefs }));
            setStep(1);
            setScreen("onboarding");
          }}
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
          onUserUpdate={(patch) =>
            setAuthUser((current) => ({ ...current, ...patch }))
          }
          onBack={back}
          onReset={reset}
        />
      )}{" "}
      <InteractionPanel
        open={interactionOpen}
        user={authUser}
        onClose={() => setInteractionOpen(false)}
        onCompleted={() => {
          setNotificationCount(0);
          setInteractionOpen(true);
        }}
        onNotificationRead={() =>
          setNotificationCount((count) => Math.max(0, count - 1))
        }
      />
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
function MainScreen({ text, user, onStart }) {
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
