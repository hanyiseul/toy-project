SET NAMES utf8mb4;
USE dating_match;

ALTER TABLE places ADD COLUMN place_type ENUM('food','cafe','activity') NULL;
