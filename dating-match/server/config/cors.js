// CORS_ORIGIN accepts a comma-separated list so both local dev
// (http://localhost:3000) and a tunneled/deployed frontend can be allowed
// at the same time, e.g.:
//   CORS_ORIGIN=http://localhost:3000,https://your-frontend.trycloudflare.com
export function corsOrigins() {
  return (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
