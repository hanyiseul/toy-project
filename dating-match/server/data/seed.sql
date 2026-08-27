SET NAMES utf8mb4;
USE dating_match;

INSERT INTO places (name, category, area, description, cost_min, cost_max, indoor, halal, vegetarian, cuisine, has_parking, place_type, latitude, longitude, google_place_id)
VALUES
('서촌 작은 책방', '동네 책방', '서촌', '오래된 한옥 골목 안에서 취향을 나눠요', 0, 18000, TRUE, TRUE, TRUE, NULL, FALSE, 'culture', 37.5796, 126.9696, 'seed-seochon-bookshop'),
('통인시장 도시락 카페', '전통시장', '서촌', '엽전으로 직접 골라 담는 서울식 점심', 9000, 16000, TRUE, FALSE, TRUE, 'korean', FALSE, 'food', 37.5808, 126.9693, 'seed-tongin-market'),
('서촌 티하우스', '전통찻집', '서촌', '한옥 마당에서 즐기는 전통차와 다과', 7000, 12000, TRUE, FALSE, FALSE, NULL, FALSE, 'cafe', 37.5800, 126.9700, 'seed-seochon-teahouse'),
('서촌 한옥골목 산책', '동네 산책', '서촌', '한옥 지붕 사이로 걷는 조용한 골목길', 0, 5000, FALSE, FALSE, FALSE, NULL, FALSE, 'activity', 37.5802, 126.9705, 'seed-seochon-walk'),
('통인동 소품가게', '소품샵', '서촌', '아기자기한 소품과 문구를 구경해요', 0, 15000, TRUE, FALSE, FALSE, NULL, FALSE, 'shopping', 37.5804, 126.9698, 'seed-tongin-shop'),
('인왕산 초소책방', '뷰 포인트', '부암동', '서울이 내려다보이는 조용한 산책과 따뜻한 차', 8000, 14000, TRUE, TRUE, TRUE, NULL, FALSE, 'cafe', 37.5926, 126.9636, 'seed-inwangsan-bookshop'),
('부암동 백사실계곡 산책', '계곡 산책', '부암동', '도심 속 작은 계곡을 따라 걷는 한적한 숲길', 0, 3000, FALSE, FALSE, FALSE, NULL, FALSE, 'activity', 37.5936, 126.9646, 'seed-buam-baeksasil'),
('부암동 家 家 백반', '가정식 백반', '부암동', '집밥처럼 편안한 계절 반찬으로 채운 한 상', 10000, 16000, TRUE, FALSE, TRUE, 'korean', FALSE, 'food', 37.5921, 126.9652, 'seed-buam-bakban'),
('홍대 벽화 골목', '동네 산책', '홍대', '골목마다 그림을 구경하며 천천히 걷기 좋은 코스', 0, 8000, FALSE, TRUE, TRUE, NULL, FALSE, 'activity', 37.5563, 126.9237, 'seed-hongdae-mural'),
('연남동 브런치 카페', '브런치 카페', '홍대', '경의선숲길 옆에서 여유롭게 즐기는 브런치', 12000, 22000, TRUE, FALSE, TRUE, 'western', TRUE, 'food', 37.5506052, 126.9254349, 'seed-yeonnam-brunch'),
('홍대 쌀국수 골목', '베트남 음식', '홍대', '향긋한 쌀국수와 스프링롤을 함께 먹어요', 8000, 13000, TRUE, FALSE, TRUE, 'southeast_asian', FALSE, 'food', 37.5567, 126.9241, 'seed-hongdae-pho'),
('홍대 디저트 카페', '디저트 카페', '홍대', '아기자기한 디저트와 커피를 함께 즐겨요', 8000, 15000, TRUE, FALSE, FALSE, NULL, FALSE, 'cafe', 37.5559, 126.9231, 'seed-hongdae-dessert'),
('홍대 프리마켓', '플리마켓', '홍대', '주말마다 열리는 수공예 플리마켓 구경하기', 0, 12000, FALSE, FALSE, FALSE, NULL, FALSE, 'shopping', 37.5570, 126.9245, 'seed-hongdae-market'),
('홍대 아트갤러리', '갤러리', '홍대', '신진 작가들의 작품을 함께 감상해요', 5000, 10000, TRUE, FALSE, FALSE, NULL, FALSE, 'culture', 37.5551, 126.9228, 'seed-hongdae-gallery'),
('가로수길 편집숍 거리', '쇼핑 거리', '강남', '나란히 걸으며 구경하기 좋은 편집숍과 팝업스토어', 0, 10000, FALSE, TRUE, TRUE, NULL, FALSE, 'shopping', 37.5202, 127.0229, 'seed-garosugil-shopping'),
('강남 딤섬 맛집', '중식당', '강남', '함께 나눠 먹기 좋은 딤섬 코스', 15000, 28000, TRUE, FALSE, TRUE, 'chinese', FALSE, 'food', 37.4983, 127.0281, 'seed-gangnam-dimsum'),
('강남 루프탑 카페', '루프탑 카페', '강남', '노을과 도심 야경을 함께 볼 수 있는 카페', 10000, 20000, TRUE, FALSE, TRUE, NULL, FALSE, 'cafe', 37.4979, 127.0276, 'seed-gangnam-rooftop'),
('도산공원 산책', '도심 공원', '강남', '나무 그늘 아래를 함께 걷는 도심 속 공원', 0, 4000, FALSE, FALSE, FALSE, NULL, FALSE, 'activity', 37.5237, 127.0369, 'seed-gangnam-park'),
('강남 팝업 전시장', '팝업 전시', '강남', '시즌마다 바뀌는 팝업 전시를 구경해요', 0, 15000, TRUE, FALSE, FALSE, NULL, FALSE, 'culture', 37.4990, 127.0287, 'seed-gangnam-popup'),
('성수동 카페거리', '카페 거리', '성수동', '공장을 개조한 개성 있는 카페들이 모여있는 거리', 8000, 18000, TRUE, FALSE, TRUE, NULL, FALSE, 'cafe', 37.5445, 127.0559, 'seed-seongsu-cafe'),
('서울숲', '도심 공원', '성수동', '함께 걷고 자전거도 탈 수 있는 넓은 공원', 0, 6000, FALSE, TRUE, TRUE, NULL, FALSE, 'activity', 37.5443, 127.0374, 'seed-seoul-forest'),
('성수동 라멘집', '일본식 라멘', '성수동', '진한 돈코츠 육수의 라멘을 함께 즐겨요', 9000, 14000, TRUE, FALSE, FALSE, 'japanese', FALSE, 'food', 37.5449, 127.0562, 'seed-seongsu-ramen'),
('성수동 편집숍 거리', '편집숍 거리', '성수동', '감각적인 편집숍들을 구경하며 걷는 거리', 0, 20000, FALSE, FALSE, FALSE, NULL, FALSE, 'shopping', 37.5441, 127.0563, 'seed-seongsu-shopping'),
('성수동 복합문화공간', '복합문화공간', '성수동', '옛 공장을 개조한 전시 · 공연 공간', 6000, 14000, TRUE, FALSE, FALSE, NULL, FALSE, 'culture', 37.5448, 127.0546, 'seed-seongsu-culture'),
('이태원 세계음식거리', '세계음식 거리', '이태원', '다양한 나라의 음식을 함께 골라 먹기 좋은 거리', 10000, 25000, FALSE, TRUE, TRUE, 'middle_eastern', FALSE, 'food', 37.5346, 126.9947, 'seed-itaewon-food-street'),
('이태원 스페셜티 커피', '스페셜티 커피', '이태원', '향미 좋은 원두로 내린 커피 한 잔', 6000, 11000, FALSE, FALSE, FALSE, NULL, FALSE, 'cafe', 37.5350, 126.9945, 'seed-itaewon-coffee'),
('경리단길 편집숍', '편집숍 거리', '이태원', '작은 소품샵과 편집숍을 구경하며 걷는 골목', 0, 9000, FALSE, TRUE, TRUE, NULL, FALSE, 'shopping', 37.5385, 126.9932, 'seed-gyeongnidan-shops'),
('우사단로 벽화거리', '벽화거리', '이태원', '언덕길을 오르며 만나는 이국적인 벽화들', 0, 5000, FALSE, FALSE, FALSE, NULL, FALSE, 'activity', 37.5375, 126.9959, 'seed-itaewon-mural'),
('이태원 소품 갤러리', '소품 갤러리', '이태원', '이색적인 소품과 작은 전시를 함께 구경해요', 5000, 12000, TRUE, FALSE, FALSE, NULL, FALSE, 'culture', 37.5348, 126.9930, 'seed-itaewon-gallery')
ON DUPLICATE KEY UPDATE name = VALUES(name), cuisine = VALUES(cuisine), has_parking = VALUES(has_parking), place_type = VALUES(place_type), indoor = VALUES(indoor), latitude = VALUES(latitude), longitude = VALUES(longitude);
