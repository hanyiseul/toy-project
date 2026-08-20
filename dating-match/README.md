# dating-match

외국인에게 진짜 한국인과 데이트할 기회를 연결하고, 국적과 취향에 맞는 서울 데이트 코스를 추천하는 풀스택 프로젝트입니다.

## Stack

- Frontend: Next.js App Router, React, lucide-react
- Backend: Node.js, Express
- Data: 초기 버전은 API 메모리 데이터

## Run

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:3000
- Backend health: http://localhost:4000/api/health

## Included

회원 프로필(한국인/외국인, 국적, 연령대, 성별, 비자, 선택 사진/매칭 여부), 국적·식단별 장소 필터, 여름/겨울 코스 조정, 장소 고정과 순서 변경, 장소별 좋아요/싫어요, 예상 비용 범위, 코스 지도 표시, 한국어/영어/일본어/중국어 전환을 포함합니다.

## Feature structure

```text
client/
	app/                         # Next.js route and global layout
	src/pages/Home/              # page composition
	src/components/home/         # header, hero, matching, value sections
	src/components/course/       # map, course controls, place item
	src/components/profile/      # profile form modal
	src/hooks/                   # course state and side effects
	src/services/                # backend API clients
	src/data/                    # fallback data and translations
server/
	routes/                      # HTTP endpoint registration
	controllers/                 # request/response handling
	services/                    # recommendation and profile rules
	data/                        # repository boundary for place data
```

`server/data/fallbackData.js`는 MySQL이 없을 때만 사용하는 개발용 fallback입니다. MySQL이 연결되면 repository가 DB를 우선 사용합니다.

## Real data setup

API는 MySQL이 설정되면 users, places, match requests, feedbacks를 DB에서 조회하고 저장합니다.

MySQL 8 이상을 설치하고 실행한 뒤 DB와 사용자를 만듭니다.

```sql
CREATE DATABASE dating_match CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dating_match'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL PRIVILEGES ON dating_match.* TO 'dating_match'@'localhost';
FLUSH PRIVILEGES;
```

환경 파일을 만들고 연결 문자열을 입력합니다.

```bash
cp server/.env.example server/.env
```

`server/.env`:

```env
DATABASE_URL=mysql://dating_match:change-me@127.0.0.1:3306/dating_match
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

schema와 초기 장소 데이터를 넣습니다.

```bash
mysql -u dating_match -p dating_match < server/schema/001_schema.sql
mysql -u dating_match -p dating_match < server/data/seed.sql
npm run dev --prefix server
```

기존 DB를 이미 만들었다면 상호작용 테이블을 추가로 실행합니다.

```bash
mysql -u root -p dating_match < server/schema/002_interactions.sql
```

이 schema 알림, 매칭 완료 대화방, 채팅 메시지 테이블을 생성합니다.

서버 로그에 `database: { configured: true, connected: true }`가 나오면 연결된 것입니다. 운영 장소 데이터는 Google Places, Kakao, Naver Places 등의 실제 수집 작업으로 `places` 테이블에 넣습니다.

MySQL이 없거나 연결에 실패하면 장소, 파트너, 프로필, 매칭 신청 API가 fallback으로 동작합니다. 프로필/매칭 신청 응답의 `persisted: false`는 DB에 저장되지 않았다는 뜻입니다.

장소 데이터에는 provider의 place ID와 좌표를 저장해 중복 수집을 막고, DB의 지역·식단·실내외 필터를 통해 코스를 구성합니다.

## Code formatting

```bash
npm run format
```

JS, JSX, CSS, Markdown은 Prettier로 정리합니다. SQL은 Prettier 기본 parser 대상이 아니므로 `schema.sql`과 `seed.sql`은 별도 SQL 스타일을 유지합니다.
