import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "development-only-change-this-secret";

export function signAuthToken(user) {
  return jwt.sign({ sub: String(user.id), email: user.email }, secret, { expiresIn: "7d" });
}

export function parseAuthCookie(cookieHeader) {
  return cookieHeader?.match(/(?:^|; )dm_auth=([^;]+)/)?.[1];
}

export function verifyAuthToken(token) {
  return jwt.verify(decodeURIComponent(token), secret);
}

export function requireAuth(req, res, next) {
  const bearer = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  const token = bearer || parseAuthCookie(req.headers.cookie);
  if (!token) return res.status(401).json({ message: "로그인이 필요합니다." });
  try {
    req.user = verifyAuthToken(token);
    next();
  } catch {
    res.status(401).json({ message: "로그인이 만료되었습니다." });
  }
}

// Cross-origin deployments (frontend and API on different hosts, e.g. behind
// a tunnel or separate domains) need SameSite=None + Secure or the browser
// won't send the cookie back on fetch requests. Same-origin/local dev keeps
// SameSite=Lax so it still works over plain http://localhost.
export function cookieAttributes() {
  return process.env.CROSS_SITE_COOKIES === "true"
    ? "SameSite=None; Secure"
    : "SameSite=Lax";
}

export function setAuthCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `dm_auth=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=604800; ${cookieAttributes()}`,
  );
}
