SET NAMES utf8mb4;
USE dating_match;

ALTER TABLE users ADD COLUMN match_target ENUM('foreign','korean') NULL;

ALTER TABLE users MODIFY dietary_preference VARCHAR(30) NULL;
UPDATE users SET dietary_preference = NULL
  WHERE dietary_preference NOT IN ('korean','western','japanese','chinese','southeast_asian','middle_eastern');
ALTER TABLE users MODIFY dietary_preference
  ENUM('korean','western','japanese','chinese','southeast_asian','middle_eastern') NULL;

ALTER TABLE places ADD COLUMN cuisine
  ENUM('korean','western','japanese','chinese','southeast_asian','middle_eastern') NULL;
ALTER TABLE places ADD COLUMN has_parking BOOLEAN NOT NULL DEFAULT FALSE;
