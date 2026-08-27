import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Pin,
  RefreshCw,
  Search,
  Share2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { errorTranslations, uiTranslations } from "../../data/translations";
import { placeApi } from "../../services/placeApi";
import { buildProfilePayload } from "../../utils/buildProfilePayload";
import { API_URL } from "../../config/api";
import { authFetch } from "../../services/authFetch";

const PLACES_API = `${API_URL}/places`;

function mapPlace(place) {
  return {
    id: place.id,
    title: place.name,
    category: `${place.type} · ${place.area}`,
    text: place.description,
    min: place.costMin,
    max: place.costMax,
    placeType: place.placeType,
  };
}

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
  onUserUpdate,
  onBack,
  onReset,
}) {
  const [items, setItems] = useState([]);
  const [placeError, setPlaceError] = useState("");
  const [placesEmpty, setPlacesEmpty] = useState(false);
  const [pinned, setPinned] = useState({});
  const [votes, setVotes] = useState({});
  const [swapNotice, setSwapNotice] = useState(null);
  const [matchingOpen, setMatchingOpen] = useState(false);
  const [matchPromptOpen, setMatchPromptOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareNotice, setShareNotice] = useState("");
  const [promoOpen, setPromoOpen] = useState(false);
  const promoShownRef = useRef(false);
  const promoTimerRef = useRef(null);
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
    const params = new URLSearchParams({
      preference: form.stylePref || "all",
      cuisine: form.cuisine || "",
      transport: form.transport || "walk",
      area: form.location || "all",
    });
    setPlaceError("");
    setPlacesEmpty(false);
    setPinned({});
    fetch(`${PLACES_API}?${params}`)
      .then((response) =>
        response.json().then((data) => ({ ok: response.ok, data })),
      )
      .then(({ ok, data }) => {
        if (!ok) throw new Error("fetch-failed");
        if (!data.places?.length) {
          setItems([]);
          setPlacesEmpty(true);
          return;
        }
        setItems(data.places.map(mapPlace));
      })
      .catch(() =>
        setPlaceError(
          "실제 장소 데이터를 불러오지 못했어요. 관리자에게 데이터 연결을 확인해주세요.",
        ),
      );
  }, [form.stylePref, form.cuisine, form.transport, form.location]);
  useEffect(() => {
    if (promoShownRef.current || !items.length) return;
    promoShownRef.current = true;
    promoTimerRef.current = setTimeout(() => setPromoOpen(true), 1200);
  }, [items.length]);
  useEffect(() => () => clearTimeout(promoTimerRef.current), []);
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
    authFetch(`${API_URL}/matches?${params}`)
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
    if (!user?.matchTarget) {
      setMatchPromptOpen(true);
      return;
    }
    setMatchingOpen(true);
    setPage(1);
  };
  const chooseMatchTarget = (target) => {
    placeApi
      .saveProfile(buildProfilePayload({ ...form, matching: true, matchTarget: target }))
      .catch(() => {});
    onUserUpdate?.({ matchTarget: target, matchingEnabled: true });
    setMatchPromptOpen(false);
    setMatchingOpen(true);
    setPage(1);
  };
  const changeFilter = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };
  const placeQueryParams = (extra) =>
    new URLSearchParams({
      preference: form.stylePref || "all",
      cuisine: form.cuisine || "",
      transport: form.transport || "walk",
      area: form.location || "all",
      ...extra,
    });
  const swapPlace = (id) => {
    const current = items.find((place) => place.id === id);
    if (!current || pinned[id]) return;
    const params = placeQueryParams({
      types: current.placeType,
      exclude: items.map((place) => place.id).join(","),
    });
    fetch(`${PLACES_API}?${params}`)
      .then((response) => response.json())
      .then((data) => {
        const alternative = data.places?.[0];
        if (!alternative) {
          setSwapNotice(id);
          setTimeout(() => setSwapNotice(null), 2500);
          return;
        }
        setItems((current) =>
          current.map((place) => (place.id === id ? mapPlace(alternative) : place)),
        );
      })
      .catch(() => {});
  };
  const regenerateCourse = () => {
    const toReplace = items.filter((place) => !pinned[place.id]);
    if (!toReplace.length) return;
    const params = placeQueryParams({
      types: toReplace.map((place) => place.placeType).join(","),
      exclude: items.map((place) => place.id).join(","),
    });
    fetch(`${PLACES_API}?${params}`)
      .then((response) => response.json())
      .then((data) => {
        const byType = Object.fromEntries(
          (data.places || []).map((place) => [place.placeType, place]),
        );
        setItems((current) =>
          current.map((place) =>
            pinned[place.id] || !byType[place.placeType]
              ? place
              : mapPlace(byType[place.placeType]),
          ),
        );
      })
      .catch(() => {});
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${form.location || "서울"} 데이트 코스\n${items
    .map((item, index) => `${index + 1}. ${item.title}`)
    .join("\n")}`;
  const shareCourse = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${form.location || "서울"} 데이트 코스`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled the native share sheet — nothing else to do
      }
      return;
    }
    setShareNotice("");
    setShareOpen(true);
  };
  const copyShareLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setShareNotice("링크가 복사됐어요.");
    } catch {
      setShareNotice("복사에 실패했어요.");
    }
  };
  const shareViaSms = () => {
    window.location.href = `sms:?body=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    setShareOpen(false);
  };
  const shareViaInstagram = async () => {
    try {
      await navigator.clipboard?.writeText(`${shareText}\n${shareUrl}`);
      setShareNotice("공유 문구가 복사됐어요. 인스타그램에 붙여넣어 주세요.");
    } catch {
      setShareNotice("복사에 실패했어요.");
    }
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
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
          <button className="lang-dot">{text.flag}</button>
        </div>
      </header>
      <a
        className="ad-banner"
        href="https://www.jbbank.co.kr/NFF_CRCD_DETAIL.act"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="ad-card-mock">
          <span className="ad-card-bank">Jeonbuk Bank</span>
          <span className="ad-card-chip" />
          <span className="ad-card-name">4 TRACK</span>
        </div>
        <div className="ad-banner-body">
          <small className="ad-banner-brand">전북은행</small>
          <strong>4TRACK 신용카드</strong>
          <span>언제 어디서든 최대 1.5% 적립</span>
        </div>
        <ChevronRight size={16} />
      </a>
      <div className="result-title">
        <span className="result-badge">♥ {text.localBadge}</span>
        <h2>
          {form.location || "서울"}에서
          <br />
          <em>오늘의 코스</em>
        </h2>
        <p>
          {form.stylePref === "outdoor" ? text.outdoorPref : text.indoorPref} ·{" "}
          {form.transport === "drive" ? text.drive : text.walk} ·{" "}
          {text[
            {
              korean: "cuisineKorean",
              western: "cuisineWestern",
              japanese: "cuisineJapanese",
              chinese: "cuisineChinese",
              southeast_asian: "cuisineSoutheastAsian",
              middle_eastern: "cuisineMiddleEastern",
            }[form.cuisine]
          ]}
        </p>
      </div>
      {placesEmpty ? (
        <div className="empty-places">
          <p>{text.emptyPlaces}</p>
          <button onClick={onBack}>{errorText.retry}</button>
        </div>
      ) : (
        <>
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
            <button className="regenerate-link" onClick={regenerateCourse}>
              <RefreshCw size={13} /> {text.regenerateCourse}
            </button>
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
                    <button onClick={() => swapPlace(place.id)} disabled={pinned[place.id]}>
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
                  {swapNotice === place.id && (
                    <small className="swap-notice">{text.noAlternative}</small>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
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
        <button onClick={shareCourse}>
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
            authFetch(`${API_URL}/matches/requests`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ partnerId: id }),
            }).catch(() => {});
            setAppliedId(id);
            setMatchingOpen(false);
          }}
          onClose={() => setMatchingOpen(false)}
        />
      )}
      {matchPromptOpen && (
        <MatchPreferenceSheet
          text={text}
          onSelect={chooseMatchTarget}
          onClose={() => setMatchPromptOpen(false)}
        />
      )}
      {shareOpen && (
        <div className="interaction-backdrop" onClick={() => setShareOpen(false)}>
          <aside
            className="interaction-sheet share-sheet"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="interaction-header">
              <div>
                <span className="notification-kicker">
                  <Share2 size={14} /> SHARE
                </span>
                <h2>코스 공유하기</h2>
              </div>
              <button onClick={() => setShareOpen(false)}>
                <X size={19} />
              </button>
            </header>
            <div className="share-options">
              <button onClick={shareViaSms}>문자로 보내기</button>
              <button onClick={shareViaInstagram}>인스타그램에 공유</button>
              <button onClick={copyShareLink}>링크 복사</button>
            </div>
            <p className="share-hint">
              카카오톡 공유는 모바일 브라우저의 공유 버튼을 이용해주세요.
            </p>
            {shareNotice && <small className="swap-notice">{shareNotice}</small>}
          </aside>
        </div>
      )}
      {promoOpen && (
        <div className="interaction-backdrop" onClick={() => setPromoOpen(false)}>
          <aside
            className="interaction-sheet promo-sheet"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="promo-close" onClick={() => setPromoOpen(false)}>
              <X size={19} />
            </button>
            <img
              className="promo-image"
              src="/images/unnamed.webp"
              alt="bravo KOREA"
            />
            <div className="promo-body">
              <span className="notification-kicker promo-kicker">
                BRAVO KOREA
              </span>
              <h2 className="promo-title">
                한국 생활에 더 많은 정보를 얻고 싶다면
                <br />
                <strong>bravoKorea!</strong>
              </h2>
              <button
                className="complete-button"
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=kr.co.jbbank.bravokorea&hl=ko",
                    "_blank",
                    "noopener,noreferrer",
                  );
                  setPromoOpen(false);
                }}
              >
                지금 만나보기 <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

function MatchPreferenceSheet({ text, onSelect, onClose }) {
  return (
    <div className="interaction-backdrop" onClick={onClose}>
      <aside
        className="interaction-sheet"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="interaction-header">
          <div>
            <span className="notification-kicker">
              <Heart size={14} /> MATCHING
            </span>
            <h2>{text.matchSettingTitle}</h2>
            <p>{text.matchTargetLabel}</p>
          </div>
          <button onClick={onClose}>
            <X size={19} />
          </button>
        </header>
        <div className="request-list">
          <button className="choice" onClick={() => onSelect("foreign")}>
            <b>🌍</b>
            <span>
              <strong>{text.matchTargetForeign}</strong>
            </span>
          </button>
          <button className="choice" onClick={() => onSelect("korean")}>
            <b>🇰🇷</b>
            <span>
              <strong>{text.matchTargetKorean}</strong>
            </span>
          </button>
        </div>
      </aside>
    </div>
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
