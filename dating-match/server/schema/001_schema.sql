CREATE DATABASE IF NOT EXISTS dating_match CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dating_match;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  user_type ENUM('foreign','korean') NOT NULL,
  nickname VARCHAR(80) NOT NULL,
  bio VARCHAR(500),
  age TINYINT UNSIGNED,
  preferred_area VARCHAR(80),
  match_score DECIMAL(5,2) NOT NULL DEFAULT 0,
  nationality VARCHAR(80) NOT NULL,
  age_range VARCHAR(30) NOT NULL,
  gender VARCHAR(30) NOT NULL,
  visa_type VARCHAR(80),
  photo_url VARCHAR(500),
  matching_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  dietary_preference ENUM('all','halal','vegetarian') NOT NULL DEFAULT 'all',
  location VARCHAR(120),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_matching (user_type, matching_enabled, nationality),
  INDEX idx_users_matching_sort (preferred_area, match_score, age)
);

-- Existing installations can run these statements once after the initial schema.
-- ALTER TABLE users ADD COLUMN nickname VARCHAR(80) NOT NULL DEFAULT '미결추 사용자';
-- ALTER TABLE users ADD COLUMN bio VARCHAR(500), ADD COLUMN age TINYINT UNSIGNED, ADD COLUMN preferred_area VARCHAR(80), ADD COLUMN match_score DECIMAL(5,2) NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS places (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  category VARCHAR(80) NOT NULL,
  area VARCHAR(80) NOT NULL,
  description VARCHAR(500),
  cost_min INT UNSIGNED NOT NULL DEFAULT 0,
  cost_max INT UNSIGNED NOT NULL DEFAULT 0,
  indoor BOOLEAN NOT NULL DEFAULT FALSE,
  halal BOOLEAN NOT NULL DEFAULT FALSE,
  vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  google_place_id VARCHAR(180) UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_places_filter (is_active, area, halal, vegetarian)
);

CREATE TABLE IF NOT EXISTS match_requests (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  requester_id BIGINT UNSIGNED NOT NULL,
  partner_id BIGINT UNSIGNED NOT NULL,
  status ENUM('requested','accepted','rejected','cancelled') NOT NULL DEFAULT 'requested',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_match_request (requester_id, partner_id),
  CONSTRAINT fk_requester FOREIGN KEY (requester_id) REFERENCES users(id),
  CONSTRAINT fk_partner FOREIGN KEY (partner_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  type ENUM('match_request','match_accepted','message') NOT NULL,
  match_request_id BIGINT UNSIGNED,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_notification_request FOREIGN KEY (match_request_id) REFERENCES match_requests(id)
);

CREATE TABLE IF NOT EXISTS conversations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  match_request_id BIGINT UNSIGNED NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_conversation_request FOREIGN KEY (match_request_id) REFERENCES match_requests(id)
);

CREATE TABLE IF NOT EXISTS messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  conversation_id BIGINT UNSIGNED NOT NULL,
  sender_id BIGINT UNSIGNED NOT NULL,
  body VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_message_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  CONSTRAINT fk_message_sender FOREIGN KEY (sender_id) REFERENCES users(id),
  INDEX idx_messages_conversation (conversation_id, created_at)
);

CREATE TABLE IF NOT EXISTS place_feedback (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  place_id BIGINT UNSIGNED NOT NULL,
  value ENUM('up','down') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_place_feedback (user_id, place_id),
  CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_feedback_place FOREIGN KEY (place_id) REFERENCES places(id)
);
