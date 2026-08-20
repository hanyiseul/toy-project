import {
  CalendarDays,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";
import CourseMap from "./CourseMap";
import PlaceItem from "./PlaceItem";

function money(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function CourseSection({
  text,
  places,
  season,
  setSeason,
  diet,
  setDiet,
  total,
  locked,
  feedback,
  onLock,
  onFeedback,
  onMove,
  onSave,
}) {
  return (
    <section className="course-section" id="course">
      <div className="section-heading">
        <div>
          <p className="section-kicker">02 / {text.course}</p>
          <h2>
            오늘은 <em>서촌답게</em>
          </h2>
        </div>
        <div className="course-controls">
          <div className="segmented">
            <button
              className={season === "summer" ? "selected" : ""}
              onClick={() => setSeason("summer")}
            >
              ☀ 여름
            </button>
            <button
              className={season === "winter" ? "selected" : ""}
              onClick={() => setSeason("winter")}
            >
              ❄ 겨울
            </button>
          </div>
          <select
            value={diet}
            onChange={(event) => setDiet(event.target.value)}
          >
            <option value="all">모든 음식</option>
            <option value="halal">할랄 프렌들리</option>
            <option value="vegetarian">채식 중심</option>
          </select>
        </div>
      </div>
      <div className="course-grid">
        <CourseMap places={places} />
        <div className="course-list">
          <div className="course-total">
            <div>
              <span>{text.total}</span>
              <strong>
                {money(total.min)} <b>—</b> {money(total.max)}
              </strong>
            </div>
            <div className="course-meta">
              <span>
                <CalendarDays size={15} /> 5–6시간
              </span>
              <span>
                <MapPin size={15} /> 도보 2.1km
              </span>
            </div>
          </div>
          {places.map((place, index) => (
            <PlaceItem
              key={place.id}
              place={place}
              index={index}
              isLast={index === places.length - 1}
              locked={locked[place.id]}
              feedback={feedback[place.id]}
              onLock={onLock}
              onFeedback={onFeedback}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
      <div className="course-footer">
        <span>
          <SlidersHorizontal size={15} /> 국적 · 비자 · 취향을 반영한 추천
        </span>
        <button className="primary-button" onClick={onSave}>
          {text.save} <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
