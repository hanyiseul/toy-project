-- 데이터베이스 생성
CREATE DATABASE vocab_book;

-- 데이터 베이스 사용
use vocab_book;

-- 테이블 생성
CREATE TABLE board (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT
);

-- 더미 데이터 생성
DELIMITER $$

CREATE PROCEDURE testDataInsert()
BEGIN
    DECLARE i INT DEFAULT 1;

    WHILE i <= 120 DO
        INSERT INTO board(title, content)
        VALUES (CONCAT('제목', i), CONCAT('내용', i));
        
        SET i = i + 1;
    END WHILE;
END $$

DELIMITER ;

-- 더미 데이터 함수 사용
CALL testDataInsert();