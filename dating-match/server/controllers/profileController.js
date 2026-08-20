import { updateProfile, validateProfile } from "../services/profileService.js";

export async function saveProfile(req, res, next) {
  const missing = validateProfile(req.body);
  if (missing.length)
    return res
      .status(400)
      .json({ message: `필수 항목: ${missing.join(", ")}` });
  try {
    res.status(201).json(await updateProfile(req.user.sub, req.body));
  } catch (error) {
    next(error);
  }
}
