export default function MatchSection({ text }) {
  return (
    <section className="match-strip" id="values">
      <div>
        <p className="section-kicker">01 / {text.match}</p>
        <h2>
          여행이 끝난 뒤에도
          <br />
          <em>이어질 수 있는</em> 만남
        </h2>
        <p className="section-description">
          국적과 취향을 데이터로만 판단하지 않아요. 한국에서의 오늘을 함께
          보내고 싶은 사람을 연결합니다.
        </p>
      </div>
      <div className="match-profile">
        <div className="avatar">지</div>
        <div>
          <p className="match-name">
            김지우 <span>29 · 서울</span>
          </p>
          <p className="match-note">
            “새로운 동네를 천천히 발견하는 걸 좋아해요.”
          </p>
          <div className="tag-row">
            <span>동네 산책</span>
            <span>독립영화</span>
            <span>매운 음식 잘 먹어요</span>
          </div>
        </div>
        <div className="compatibility">
          <strong>92%</strong>
          <span>같은 결</span>
        </div>
      </div>
    </section>
  );
}
