SET NAMES utf8mb4;
USE dating_match;

ALTER TABLE places MODIFY place_type ENUM('food','cafe','activity','culture','shopping') NULL;
