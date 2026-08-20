import { Check, GripVertical, Plus, ThumbsDown, ThumbsUp } from "lucide-react";

function money(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function PlaceItem({
  place,
  index,
  isLast,
  locked,
  feedback,
  onLock,
  onFeedback,
  onMove,
}) {
  return (
    <article className={`place-item ${locked ? "is-locked" : ""}`}>
      <div className="place-number">0{index + 1}</div>
      <div className="place-body">
        <div className="place-title">
          <div>
            <span className="place-type">
              {place.type} · {place.area}
            </span>
            <h3>{place.name}</h3>
          </div>
          <button
            className={`lock-button ${locked ? "locked" : ""}`}
            onClick={() => onLock(place.id)}
            aria-label="장소 고정 변경"
          >
            {locked ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
        <p>{place.description}</p>
        <div className="place-bottom">
          <strong>
            {money(place.costMin)} — {money(place.costMax)}
          </strong>
          <div className="feedback">
            <button
              className={feedback === "up" ? "liked" : ""}
              onClick={() => onFeedback(place.id, "up")}
            >
              <ThumbsUp size={14} />
            </button>
            <button
              className={feedback === "down" ? "disliked" : ""}
              onClick={() => onFeedback(place.id, "down")}
            >
              <ThumbsDown size={14} />
            </button>
            <button
              className="move-button"
              onClick={() => onMove(index, -1)}
              disabled={index === 0 || locked}
            >
              <GripVertical size={15} /> 위로
            </button>
            <button
              className="move-button"
              onClick={() => onMove(index, 1)}
              disabled={isLast || locked}
            >
              <GripVertical size={15} /> 아래로
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
