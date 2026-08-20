import { query } from "../config/database.js";

function withProfileComplete(user) {
  if (!user) return user;
  const { nationality, ...rest } = user;
  return { ...rest, profileComplete: Boolean(nationality) && nationality !== "unknown" };
}

export async function findUserByEmail(email) {
  const rows = await query("SELECT id, email, password_hash AS passwordHash, nickname, user_type AS userType, nationality FROM users WHERE email = ? LIMIT 1", [email]);
  return rows[0] ? withProfileComplete(rows[0]) : null;
}

export async function createAuthUser({ email, passwordHash, nickname }) {
  const result = await query("INSERT INTO users (email, password_hash, user_type, nickname, nationality, age_range, gender, matching_enabled) VALUES (?, ?, 'foreign', ?, 'unknown', 'unknown', 'unknown', TRUE)", [email, passwordHash, nickname || "미결추 사용자"]);
  return { id: result.insertId, email, nickname: nickname || "미결추 사용자", profileComplete: false };
}

export async function findUserById(id) {
  const rows = await query(
    "SELECT id, email, nickname, user_type AS userType, nationality, matching_enabled AS matchingEnabled, match_target AS matchTarget, dietary_preference AS cuisinePreference, location FROM users WHERE id = ?",
    [id],
  );
  return rows[0] ? withProfileComplete(rows[0]) : null;
}
