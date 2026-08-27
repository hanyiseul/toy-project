import bcrypt from "bcryptjs";
import {
  createAuthUser,
  findUserByEmail,
  findUserById,
  findUsersByBirthDateAndNickname,
  updatePasswordHash,
} from "../data/authRepository.js";
import { cookieAttributes, setAuthCookie, signAuthToken } from "../middleware/authMiddleware.js";

export async function signup(req, res, next) {
  const { email, password, nickname, birthDate } = req.body;
  if (!email || !password || password.length < 8 || !birthDate)
    return res
      .status(400)
      .json({ message: "이메일, 생년월일, 8자 이상의 비밀번호가 필요합니다." });
  try {
    if (await findUserByEmail(email)) return res.status(409).json({ message: "이미 가입된 이메일입니다." });
    const user = await createAuthUser({ email, passwordHash: await bcrypt.hash(password, 12), nickname, birthDate });
    const token = signAuthToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ user, token });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) return res.status(401).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    const token = signAuthToken(user);
    setAuthCookie(res, token);
    res.json({
      user: { id: user.id, email: user.email, nickname: user.nickname, profileComplete: user.profileComplete },
      token,
    });
  } catch (error) { next(error); }
}

export async function me(req, res, next) {
  try { res.json({ user: await findUserById(req.user.sub) }); } catch (error) { next(error); }
}

export function logout(_, res) {
  res.setHeader(
    "Set-Cookie",
    `dm_auth=; HttpOnly; Path=/; Max-Age=0; ${cookieAttributes()}`,
  );
  res.status(204).end();
}

export async function findEmail(req, res, next) {
  const { birthDate, nickname } = req.body;
  if (!birthDate || !nickname)
    return res.status(400).json({ message: "생년월일과 닉네임을 입력해주세요." });
  try {
    const rows = await findUsersByBirthDateAndNickname(birthDate, nickname);
    res.json({ emails: rows.map((row) => row.email) });
  } catch (error) { next(error); }
}

export async function resetPassword(req, res, next) {
  const { email, nickname, newPassword } = req.body;
  if (!email || !nickname || !newPassword || newPassword.length < 8)
    return res
      .status(400)
      .json({ message: "이메일, 닉네임, 8자 이상의 새 비밀번호가 필요합니다." });
  try {
    const user = await findUserByEmail(email);
    if (!user || user.nickname !== nickname)
      return res.status(404).json({ message: "일치하는 계정을 찾을 수 없습니다." });
    await updatePasswordHash(user.id, await bcrypt.hash(newPassword, 12));
    res.json({ message: "비밀번호가 재설정되었습니다." });
  } catch (error) { next(error); }
}

export async function changePassword(req, res, next) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8)
    return res
      .status(400)
      .json({ message: "현재 비밀번호와 8자 이상의 새 비밀번호가 필요합니다." });
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash)))
      return res.status(401).json({ message: "현재 비밀번호가 올바르지 않습니다." });
    await updatePasswordHash(user.id, await bcrypt.hash(newPassword, 12));
    res.json({ message: "비밀번호가 변경되었습니다." });
  } catch (error) { next(error); }
}
