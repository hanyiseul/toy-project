-- 사용할 db 선택
use accountBook; 

-- transactions 테이블 생성
create table transactions (
	id int auto_increment primary key, -- 기본값, 자동증가
    user_id VARCHAR(50) not null, -- 작성자 아이디, 빈값 금지
	amount int not null, -- 소비/지출 금액, 빈값 금지
	category varchar(255), -- 소비/지출 카테고리
    type varchar(255), -- 소비/지출 선택
    memo text, -- 작성 메모
    create_at datetime default current_timestamp, -- 작성일, 기본값 값을 넣지 않으면 현재 시간을 자동으로 넣어줌
	foreign key (user_id) references member(user_id) on delete cascade -- 작성자 아이디
		-- member(user_id) 참조
		-- on delete cascade: member 테이블에서 user_id 삭제되면 해당 테이블에서도 데이터 삭제
);