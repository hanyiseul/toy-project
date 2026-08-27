import { updateProfile, validateProfile } from "../services/profileService.js";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:4000";

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

export function uploadPhoto(req, res) {
  if (!req.file) return res.status(400).json({ message: "이미지 파일이 필요합니다." });
  res.status(201).json({ photoUrl: `${PUBLIC_URL}/uploads/${req.file.filename}` });
}
