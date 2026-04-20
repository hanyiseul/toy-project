-- 생성한 database 사용 
use todoList;

-- todo 테이블
create table todos (
	id int auto_increment primary key,
    title varchar(2000) not null,
    memo text,
    created_at datetime
);

-- 더미 데이터
