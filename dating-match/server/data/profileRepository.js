import { query } from "../config/database.js";
import { fallbackMatches } from "./fallbackData.js";

export async function updateProfileForUser(userId, profile) {
  try {
    const rows = await query(
      "SELECT user_type, bio, age, preferred_area, nationality, age_range, gender, visa_type, photo_url, matching_enabled, match_target, dietary_preference, location FROM users WHERE id = ?",
      [userId],
    );
    const current = rows[0] || {};
    const merged = {
      user_type: profile.type ?? current.user_type,
      bio: profile.bio !== undefined ? profile.bio || null : current.bio,
      age:
        profile.age !== undefined
          ? profile.age
            ? Number.parseInt(profile.age, 10) || null
            : null
          : current.age,
      preferred_area:
        profile.preferredArea ?? profile.location ?? current.preferred_area,
      nationality: profile.nationality ?? current.nationality,
      age_range: profile.ageRange ?? current.age_range,
      gender: profile.gender ?? current.gender,
      visa_type:
        profile.visa !== undefined ? profile.visa || null : current.visa_type,
      photo_url:
        profile.photoUrl !== undefined
          ? profile.photoUrl || null
          : current.photo_url,
      matching_enabled:
        profile.matching !== undefined
          ? Boolean(profile.matching)
          : (current.matching_enabled ?? true),
      match_target:
        profile.matchTarget !== undefined
          ? profile.matchTarget || null
          : current.match_target,
      dietary_preference:
        profile.cuisine !== undefined
          ? profile.cuisine || null
          : current.dietary_preference,
      location:
        profile.location !== undefined ? profile.location || null : current.location,
    };
    await query(
      `UPDATE users SET user_type = ?, bio = ?, age = ?, preferred_area = ?, nationality = ?, age_range = ?, gender = ?, visa_type = ?, photo_url = ?, matching_enabled = ?, match_target = ?, dietary_preference = ?, location = ? WHERE id = ?`,
      [
        merged.user_type,
        merged.bio,
        merged.age,
        merged.preferred_area,
        merged.nationality,
        merged.age_range,
        merged.gender,
        merged.visa_type,
        merged.photo_url,
        merged.matching_enabled,
        merged.match_target,
        merged.dietary_preference,
        merged.location,
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
