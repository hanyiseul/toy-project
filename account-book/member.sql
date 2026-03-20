-- database 생성
create database accountBook
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- 생성한 database 사용 
use accountBook;

-- 회원정보 테이블 
create table member (
	id int auto_increment primary key,
    user_name varchar(50) not null,
    user_id varchar(50) UNIQUE not null,
    pwd varchar(500) not null, -- bcrypt 때문에 길게 설정하기
    birth_date date,
    tel VARCHAR(20)
);

-- 접속할 사용자 생성
create user 'accountuser'@'localhost' identified by '1234';