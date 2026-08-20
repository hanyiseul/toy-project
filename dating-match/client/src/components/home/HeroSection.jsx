import { CalendarDays, Heart, MapPin } from "lucide-react";

export default function HeroSection({ text, season, language }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span></span> A DATE, NOT A TOUR
        </p>
        <h1>
          {text.title.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero-subtitle">{text.subtitle}</p>
        <div className="hero-pills">
          <span>
            <MapPin size={14} /> Seoul, KR
          </span>
          <span>
            <CalendarDays size={14} />{" "}
            {season === "summer" ? "Summer edit" : "Winter edit"}
          </span>
        </div>
      </div>
      <div className="hero-art">
        <div className="photo-card photo-main">
          <div className="photo-label">
            {language === "ko"
              ? "서촌에서 보낸 오후"
              : "An afternoon in Seochon"}
          </div>
        </div>
        <div className="photo-card photo-small">
          <Heart size={20} fill="currentColor" />
        </div>
        <span className="stamp">
          REAL
          <br />
          KOREA
          <br />
          <b>24</b>
        </span>
      </div>
    </section>
  );
}
