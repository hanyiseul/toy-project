import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Pin,
  Search,
  Share2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import { errorTranslations, uiTranslations } from "../../data/translations";
import InteractionPanel from "../interaction/InteractionPanel";

const candidateSeeds = [
  "김지우",
  "이서준",
  "박서연",
  "최민준",
  "정하늘",
  "윤도현",
  "한유진",
  "오지훈",
  "강나래",
  "배현우",
  "송지민",
  "문지호",
  "신예은",
  "류건우",
  "장서희",
  "임도윤",
  "조아름",
  "황준혁",
  "고은채",
  "노현석",
  "서유나",
  "권민재",
  "백수빈",
  "유재현",
  "나하은",
  "김도윤",
  "이채원",
  "박건우",
  "정유나",
  "최서윤",
  "윤지호",
  "한소희",
  "오현준",
  "강예린",
  "배준서",
  "송하윤",
  "문현우",
  "신지아",
  "류민석",
  "장유진",
  "임서준",
  "조윤서",
  "황도현",
  "고서연",
  "노준혁",
  "서하은",
  "권지훈",
  "백예린",
  "유현석",
  "나민지",
  "김하준",
  "이유진",
  "박현우",
  "정서윤",
  "최도윤",
  "윤하은",
  "한지민",
  "오준혁",
  "강서연",
  "배도윤",
  "송민지",
  "문지훈",
  "신하은",
  "류현우",
  "장민서",
  "임지훈",
  "조서연",
  "황유진",
  "고현우",
  "노서윤",
  "서도윤",
  "권하은",
  "백지훈",
  "유민서",
  "나현우",
  "김서윤",
  "이준혁",
  "박하은",
  "정현우",
  "최민서",
  "윤서준",
  "한예린",
  "오도윤",
  "강지훈",
  "배서연",
  "송현우",
  "문서윤",
  "신도윤",
  "신민지",
  "류서준",
  "장하은",
  "임현우",
  "조민서",
  "황서윤",
  "고도윤",
  "노하은",
  "서현우",
];
const regions = ["서촌", "홍대", "성수", "강남"];
const nationalities = ["미국", "일본", "영국", "인도", "프랑스"];
const candidates = candidateSeeds.map((name, index) => ({
  id: index + 1,
  name,
  age: 25 + (index % 9),
  region: regions[index % regions.length],
  nationality: nationalities[index % nationalities.length],
  score: 96 - (index % 17),
  intro: [
    "동네의 좋은 순간을 함께 발견해요",
    "맛있는 것과 조용한 산책을 좋아해요",
    "처음 만나는 사람과도 편하게 이야기해요",
  ][index % 3],
}));

export default function ReferenceCourseResult({
  text,
  lang,
  form,
  user,
  onBack,
  onReset,
}) {
  const [items, setItems] = useState([]);
  const [placeError, setPlaceError] = useState("");
  const [pinned, setPinned] = useState({ 1: true });
  const [votes, setVotes] = useState({});
  const [matchingOpen, setMatchingOpen] = useState(false);
  const [interactionOpen, setInteractionOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [nationality, setNationality] = useState("all");
  const [sort, setSort] = useState("score");
  const [page, setPage] = useState(1);
  const [appliedId, setAppliedId] = useState(null);
  const [remoteCandidates, setRemoteCandidates] = useState([]);
  const [remoteTotal, setRemoteTotal] = useState(0);
  const [matchError, setMatchError] = useState("");
  const deferredQuery = useDeferredValue(query);
  const pageSize = 10;
  const ui = uiTranslations[lang];
  const errorText = errorTranslations[lang];
  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:4000/api/interaction/notifications", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) =>
        setNotificationCount(
          (data.notifications || []).filter(
            (notification) => !notification.isRead,
          ).length,
        ),
      )
      .catch(() => setNotificationCount(0));
  }, [user]);
  useEffect(() => {
    const params = new URLSearchParams({
      season: form.season,
      diet: form.diet,
      nationality: form.country || "general",
      area: form.location || "all",
    });
    fetch(`http://localhost:4000/api/places?${params}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.places?.length) throw new Error("No places");
        setItems(
          data.places.map((place) => ({
            id: place.id,
            title: place.name,
            category: `${place.type} · ${place.area}`,
            text: place.description,
            min: place.costMin,
            max: place.costMax,
          })),
        );
      })
      .catch(() =>
        setPlaceError(
          "실제 장소 데이터를 불러오지 못했어요. 관리자에게 데이터 연결을 확인해주세요.",
        ),
      );
  }, [form.season, form.diet, form.country, form.location]);
  const total = items.reduce(
    (result, place) => ({
      min: result.min + place.min,
      max: result.max + place.max,
    }),
    { min: 0, max: 0 },
  );
  useEffect(() => {
    if (!matchingOpen) return;
    const params = new URLSearchParams({
      page,
      limit: pageSize,
      query: deferredQuery,
      region,
      nationality,
      sort,
    });
    fetch(`http://localhost:4000/api/matches?${params}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.matches) throw new Error("No matches");
        setRemoteCandidates(data.matches);
        setRemoteTotal(data.pagination.total);
        setMatchError("");
      })
      .catch(() => {
        setRemoteCandidates([]);
        setRemoteTotal(0);
        setMatchError("실제 파트너 데이터를 불러오지 못했어요.");
      });
  }, [matchingOpen, page, deferredQuery, region, nationality, sort]);
  const pageCount = Math.max(1, Math.ceil(remoteTotal / pageSize));
  const visibleCandidates = remoteCandidates.filter(
    (candidate) =>
      `${candidate.name}${candidate.intro}`.includes(deferredQuery) &&
      (region === "all" || candidate.region === region) &&
      (nationality === "all" || candidate.nationality === nationality),
  );
  useEffect(() => {
    const title = document.querySelector(".result-title h2 em");
    const invite = document.querySelector(".partner > div:nth-child(2) span");
    const hint = document.querySelector(".partner > div:nth-child(2) small");
    if (title) title.textContent = ui.courseToday;
    if (invite) invite.textContent = ui.partnerInvite;
    if (hint) hint.textContent = appliedId ? ui.applySent : ui.partnerHint;
    if (!matchingOpen) return;
    const modalTitle = document.querySelector(".matching-modal h2");
    const count = document.querySelector(".matching-modal header p");
    const search = document.querySelector(".match-search input");
    const empty = document.querySelector(".empty-candidates");
    const filters = document.querySelectorAll(".matching-filters select");
    if (modalTitle)
      modalTitle.innerHTML = `${ui.matchingTitle}<br /><em>${ui.matchingTitleEm}</em>`;
    if (count)
      count.textContent = `${remoteTotal}${ui.pageUnit} ${ui.matchingCount}`;
    if (search) search.placeholder = ui.searchPlaceholder;
    if (empty) empty.textContent = ui.noCandidates;
    if (filters[0]) filters[0].options[0].text = ui.allRegions;
    if (filters[1]) filters[1].options[0].text = ui.allNationalities;
    if (filters[2]) {
      filters[2].options[0].text = ui.scoreSort;
      filters[2].options[1].text = ui.ageSort;
    }
  }, [
    lang,
    ui,
    matchingOpen,
    remoteTotal,
    appliedId,
    visibleCandidates.length,
  ]);
  const openMatching = () => {
    setMatchingOpen(true);
    setPage(1);
  };
  const changeFilter = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };
  const swap = (id) => {
    const index = items.findIndex((place) => place.id === id);
    const next = [...items];
    [next[index], next[(index + 1) % next.length]] = [
      next[(index + 1) % next.length],
      next[index],
    ];
    setItems(next);
  };

  const appliedCandidate = candidates.find(
    (candidate) => candidate.id === appliedId,
  );
  if (placeError)
    return (
      <section className="result-screen">
        <header className="result-header">
          <button onClick={onBack}>
            <ArrowLeft size={21} />
          </button>
          <strong>{text.appName}</strong>
        </header>
        <div className="data-error">
          <h2>{errorText.title}</h2>
          <p>{errorText.message}</p>
          <button onClick={onReset}>{errorText.retry}</button>
        </div>
      </section>
    );
  return (
    <section className="result-screen">
      <header className="result-header">
        <button onClick={onBack}>
          <ArrowLeft size={21} />
        </button>
        <strong>{text.appName}</strong>
        <div className="result-header-actions">
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
          <button className="lang-dot">{text.flag}</button>
        </div>
      </header>
      <div className="result-title">
        <span className="result-badge">♥ {text.localBadge}</span>
        <h2>
          {form.location || "서울"}에서
          <br />
          <em>오늘의 코스</em>
        </h2>
        <p>
          {form.season === "winter" ? text.winter : text.summer} ·{" "}
          {form.transport === "drive" ? text.drive : text.walk} ·{" "}
          {form.diet === "halal"
            ? text.halal
            : form.diet === "vegetarian"
              ? text.vegetarian
              : text.dietaryNone}
        </p>
      </div>
      <div className="budget">
        <span>{text.totalBudget}</span>
        <strong>
          {total.min.toLocaleString()}원 — {total.max.toLocaleString()}원
        </strong>
      </div>
      <div className="route-map">
        <div className="route-road"></div>
        {items.map((item, index) => (
          <div className={`route-pin route-pin-${index + 1}`} key={item.id}>
            <b>{index + 1}</b>
          </div>
        ))}
        <span className="map-word">
          SEOUL
          <br />
          <small>LOCAL DATE ROUTE</small>
        </span>
      </div>
      <div className="places-heading">
        <strong>{text.placesLabel}</strong>
        <small>{text.dragHint}</small>
      </div>
      <div className="result-places">
        {items.map((place, index) => (
          <article className="result-place" key={place.id}>
            <div className="result-number">0{index + 1}</div>
            <div className="result-place-main">
              <span>{place.category}</span>
              <h3>{place.title}</h3>
              <p>{place.text}</p>
              <strong>
                {place.min.toLocaleString()}원 — {place.max.toLocaleString()}원
              </strong>
              <div className="place-actions">
                <button
                  className={votes[place.id] === "up" ? "active" : ""}
                  onClick={() => setVotes({ ...votes, [place.id]: "up" })}
                >
                  <ThumbsUp size={14} /> {text.good}
                </button>
                <button
                  className={votes[place.id] === "down" ? "active" : ""}
                  onClick={() => setVotes({ ...votes, [place.id]: "down" })}
                >
                  <ThumbsDown size={14} /> {text.bad}
                </button>
                <button onClick={() => swap(place.id)}>
                  <ChevronDown size={14} /> {text.change}
                </button>
                <button
                  className={pinned[place.id] ? "pin active" : "pin"}
                  onClick={() =>
                    setPinned({ ...pinned, [place.id]: !pinned[place.id] })
                  }
                >
                  <Pin size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="partner">
        <div className="partner-avatar">지</div>
        <div>
          <span>파트너와 함께 해보세요!</span>
          <strong>
            {appliedCandidate ? appliedCandidate.name : "김지우"}, 29
          </strong>
          <small>
            {appliedId ? "매칭 신청을 보냈어요" : "서촌을 가장 잘 아는 한국인"}
          </small>
        </div>
        <button onClick={openMatching}>
          {appliedId ? "다른 파트너 찾기" : text.partnerCta}
        </button>
      </div>
      <div className="result-bottom">
        <button onClick={onReset}>{text.retry}</button>
        <button onClick={() => navigator.clipboard?.writeText(location.href)}>
          <Share2 size={15} /> {text.share}
        </button>
      </div>
      {matchingOpen && (
        <MatchingModal
          text={text}
          candidates={visibleCandidates}
          total={remoteTotal}
          page={page}
          pageCount={pageCount}
          query={query}
          region={region}
          nationality={nationality}
          sort={sort}
          setQuery={setQuery}
          onRegionChange={changeFilter(setRegion)}
          onNationalityChange={changeFilter(setNationality)}
          onSortChange={changeFilter(setSort)}
          onPage={setPage}
          onApply={(id) => {
            fetch("http://localhost:4000/api/matches/requests", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ partnerId: id }),
            }).catch(() => {});
            setAppliedId(id);
            setMatchingOpen(false);
          }}
          onClose={() => setMatchingOpen(false)}
        />
      )}
      <InteractionPanel
        open={interactionOpen}
        user={user}
        onClose={() => setInteractionOpen(false)}
        onCompleted={() => {
          setNotificationCount(0);
          setInteractionOpen(true);
        }}
      />
    </section>
  );
}

function MatchingModal({
  text,
  candidates: visibleCandidates,
  total,
  page,
  pageCount,
  query,
  region,
  nationality,
  sort,
  setQuery,
  onRegionChange,
  onNationalityChange,
  onSortChange,
  onPage,
  onApply,
  onClose,
}) {
  return (
    <div className="matching-backdrop">
      <div className="matching-modal">
        <header>
          <div>
            <span className="result-badge">♥ LOCAL MATCHING</span>
            <h2>
              함께할 파트너를
              <br />
              <em>선택해주세요</em>
            </h2>
            <p>{total}명의 한국인 파트너가 코스를 보고 있어요.</p>
          </div>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        <div className="matching-filters">
          <label className="match-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                onPage(1);
              }}
              placeholder="이름이나 소개 검색"
            />
          </label>
          <select value={region} onChange={onRegionChange}>
            <option value="all">모든 지역</option>
            {regions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <select value={nationality} onChange={onNationalityChange}>
            <option value="all">모든 국적</option>
            {nationalities.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <select value={sort} onChange={onSortChange}>
            <option value="score">추천 점수순</option>
            <option value="age">연령순</option>
          </select>
        </div>
        <div className="candidate-list">
          {visibleCandidates.map((candidate) => (
            <article className="candidate-card" key={candidate.id}>
              <div className="candidate-avatar">{candidate.name[0]}</div>
              <div className="candidate-info">
                <strong>
                  {candidate.name} <small>{candidate.age}</small>
                </strong>
                <span>
                  {candidate.region} · {candidate.nationality} ·{" "}
                  <b>{candidate.score}%</b>
                </span>
                <p>{candidate.intro}</p>
              </div>
              <button onClick={() => onApply(candidate.id)}>
                {text.partnerCta}
              </button>
            </article>
          ))}
          {visibleCandidates.length === 0 && (
            <p className="empty-candidates">조건에 맞는 파트너가 없어요.</p>
          )}
        </div>
        <footer>
          <span>
            {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} / {total}
          </span>
          <div>
            <button disabled={page === 1} onClick={() => onPage(page - 1)}>
              <ChevronLeft size={17} />
            </button>
            <button
              disabled={page === pageCount}
              onClick={() => onPage(page + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
