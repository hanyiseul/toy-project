import { MapPin } from "lucide-react";

export default function CourseMap({ places }) {
  return (
    <div className="map-panel">
      <div className="map-topline">
        <span>
          <MapPin size={15} /> SEOCHON, SEOUL
        </span>
        <span className="map-status">
          <span></span> LIVE ROUTE
        </span>
      </div>
      <div className="map-canvas">
        <div className="map-lines"></div>
        {places.map((place, index) => (
          <div
            className={`map-pin pin-${index + 1}`}
            key={place.id}
            style={{
              left: `${place.location.x}%`,
              top: `${place.location.y}%`,
            }}
          >
            <span>{index + 1}</span>
            <small>{place.area}</small>
          </div>
        ))}
        <div className="map-river"></div>
        <div className="map-label label-a">경복궁</div>
        <div className="map-label label-b">북악산</div>
      </div>
      <div className="map-legend">
        <span>
          <i className="legend-line"></i> 오늘의 코스
        </span>
        <span>
          <i className="legend-dot"></i> 추천 장소
        </span>
      </div>
    </div>
  );
}
