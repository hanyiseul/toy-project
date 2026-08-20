import bcrypt from "bcryptjs";
import { createAuthUser, findUserByEmail, findUserById } from "../data/authRepository.js";
import { setAuthCookie, signAuthToken } from "../middleware/authMiddleware.js";

export async function signup(req, res, next) {
  const { email, password, nickname } = req.body;
  if (!email || !password || password.length < 8) return res.status(400).json({ message: "이메일과 8자 이상의 비밀번호가 필요합니다." });
  try {
    if (await findUserByEmail(email)) return res.status(409).json({ message: "이미 가입된 이메일입니다." });
    const user = await createAuthUser({ email, passwordHash: await bcrypt.hash(password, 12), nickname });
    setAuthCookie(res, signAuthToken(user));
    res.status(201).json({ user });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) return res.status(401).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    setAuthCookie(res, signAuthToken(user));
    res.json({ user: { id: user.id, email: user.email, nickname: user.nickname, profileComplete: user.profileComplete } });
  } catch (error) { next(error); }
}

export async function me(req, res, next) {
  try { res.json({ user: await findUserById(req.user.sub) }); } catch (error) { next(error); }
}

export function logout(_, res) {
  res.setHeader("Set-Cookie", "dm_auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax");
  res.status(204).end();
}
