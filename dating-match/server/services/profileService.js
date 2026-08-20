import { updateProfileForUser } from "../data/profileRepository.js";

export function validateProfile(profile) {
  const required = ["type", "nationality", "ageRange", "gender"];
  return required.filter((field) => !profile[field]);
}

export function updateProfile(userId, profile) {
  return updateProfileForUser(userId, profile);
}
