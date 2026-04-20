-- database 생성
create database todoList
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- 생성한 database 사용 
use todoList;

-- 접속할 사용자 생성
create user 'testuser'@'localhost' identified by '1234'; -- user 생성 / 비밀번호 생성
grant all privileges on todoList.* to 'testuser'@'localhost'; -- 모든 권한(all privileges) 부여(grant)
FLUSH PRIVILEGES; -- 권한 변경 즉시 적용
select user, host from mysql.user;
