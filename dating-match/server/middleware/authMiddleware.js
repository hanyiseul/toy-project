import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "development-only-change-this-secret";

export function signAuthToken(user) {
  return jwt.sign({ sub: String(user.id), email: user.email }, secret, { expiresIn: "7d" });
}

export function requireAuth(req, res, next) {
  const token = req.headers.cookie?.match(/(?:^|; )dm_auth=([^;]+)/)?.[1];
  if (!token) return res.status(401).json({ message: "로그인이 필요합니다." });
  try {
    req.user = jwt.verify(decodeURIComponent(token), secret);
    next();
  } catch {
    res.status(401).json({ message: "로그인이 만료되었습니다." });
  }
}

export function setAuthCookie(res, token) {
  res.setHeader("Set-Cookie", `dm_auth=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
}
