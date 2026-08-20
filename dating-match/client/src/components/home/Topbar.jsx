import { ChevronDown, Languages, Menu, UserRound } from "lucide-react";

export default function Topbar({ language, text, onLanguageChange, onSignup }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top">
        <span className="brand-mark">♥</span>
        <span>미결추</span>
      </a>
      <nav>
        <a className="active" href="#course">
          {text.nav}
        </a>
        <a href="#values">Our story</a>
        <a href="#safety">Safety</a>
      </nav>
      <div className="top-actions">
        <button className="language-button" onClick={onLanguageChange}>
          <Languages size={16} /> {language.toUpperCase()}{" "}
          <ChevronDown size={14} />
        </button>
        <button className="profile-button" onClick={onSignup}>
          <UserRound size={16} /> {text.signup}
        </button>
        <button className="menu-button">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
