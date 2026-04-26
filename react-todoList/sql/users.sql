-- 회원정보 테이블
create table users (
	id int auto_increment primary key,
  name varchar(500) not null,
  user_id varchar(500) not null unique,
  pwd varchar(2000) not null
);

-- 더미 데이터
