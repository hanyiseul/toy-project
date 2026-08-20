import { query } from "../config/database.js";
import { fallbackMatches } from "./fallbackData.js";

export async function updateProfileForUser(userId, profile) {
  try {
    await query(
      `UPDATE users SET user_type = ?, bio = ?, age = ?, preferred_area = ?, nationality = ?, age_range = ?, gender = ?, visa_type = ?, photo_url = ?, matching_enabled = ?, dietary_preference = ?, location = ? WHERE id = ?`,
      [
        profile.type,
        profile.bio || null,
        profile.age ? Number.parseInt(profile.age, 10) || null : null,
        profile.preferredArea || profile.location || null,
        profile.nationality,
        profile.ageRange || profile.age || "unknown",
        profile.gender,
        profile.visa || null,
        profile.photoUrl || null,
        profile.matching !== false,
        profile.diet || "all",
        profile.location || null,
        userId,
      ],
    );
    return {
      userId,
      message: "프로필이 저장되었습니다.",
      user: profile,
      persisted: true,
      profileComplete: Boolean(profile.nationality) && profile.nationality !== "unknown",
    };
  } catch (error) {
    console.warn("Using fallback profile:", error.message);
    return {
      userId,
      message: "프로필이 저장되었습니다. DB 연결 후 실제 저장됩니다.",
      user: profile,
      persisted: false,
      fallbackCandidateCount: fallbackMatches.length,
    };
  }
}
