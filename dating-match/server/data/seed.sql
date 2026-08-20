SET NAMES utf8mb4;
USE dating_match;

INSERT INTO places (name, category, area, description, cost_min, cost_max, indoor, halal, vegetarian, latitude, longitude, google_place_id)
VALUES
('서촌 작은 책방', '동네 책방', '서촌', '오래된 한옥 골목 안에서 취향을 나눠요', 0, 18000, TRUE, TRUE, TRUE, 37.5796, 126.9696, 'seed-seochon-bookshop'),
('통인시장 도시락 카페', '전통시장', '서촌', '엽전으로 직접 골라 담는 서울식 점심', 9000, 16000, FALSE, FALSE, TRUE, 37.5808, 126.9693, 'seed-tongin-market'),
('인왕산 초소책방', '뷰 포인트', '부암동', '서울이 내려다보이는 조용한 산책과 따뜻한 차', 8000, 14000, TRUE, TRUE, TRUE, 37.5926, 126.9636, 'seed-inwangsan-bookshop'),
('홍대 벽화 골목', '동네 산책', '홍대', '골목마다 그림을 구경하며 천천히 걷기 좋은 코스', 0, 8000, FALSE, TRUE, TRUE, 37.5563, 126.9237, 'seed-hongdae-mural'),
('연남동 브런치 카페', '브런치 카페', '홍대', '경의선숲길 옆에서 여유롭게 즐기는 브런치', 12000, 22000, TRUE, FALSE, TRUE, 37.5657, 126.9255, 'seed-yeonnam-brunch'),
('가로수길 편집숍 거리', '쇼핑 거리', '강남', '나란히 걸으며 구경하기 좋은 편집숍과 팝업스토어', 0, 10000, FALSE, TRUE, TRUE, 37.5202, 127.0229, 'seed-garosugil-shopping'),
('강남 루프탑 카페', '루프탑 카페', '강남', '노을과 도심 야경을 함께 볼 수 있는 카페', 10000, 20000, TRUE, FALSE, TRUE, 37.4979, 127.0276, 'seed-gangnam-rooftop'),
('성수동 카페거리', '카페 거리', '성수동', '공장을 개조한 개성 있는 카페들이 모여있는 거리', 8000, 18000, TRUE, FALSE, TRUE, 37.5445, 127.0559, 'seed-seongsu-cafe'),
('서울숲', '도심 공원', '성수동', '함께 걷고 자전거도 탈 수 있는 넓은 공원', 0, 6000, FALSE, TRUE, TRUE, 37.5443, 127.0374, 'seed-seoul-forest'),
('이태원 세계음식거리', '세계음식 거리', '이태원', '다양한 나라의 음식을 함께 골라 먹기 좋은 거리', 10000, 25000, TRUE, TRUE, TRUE, 37.5346, 126.9947, 'seed-itaewon-food-street'),
('경리단길 편집숍', '편집숍 거리', '이태원', '작은 소품샵과 편집숍을 구경하며 걷는 골목', 0, 9000, FALSE, TRUE, TRUE, 37.5385, 126.9932, 'seed-gyeongnidan-shops')
ON DUPLICATE KEY UPDATE name = VALUES(name);
