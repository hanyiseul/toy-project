import { getToken } from "./authToken";

// Cookies alone don't survive private/incognito browsing or strict
// third-party-cookie blocking when the frontend and API are on different
// origins (e.g. two separate tunnel domains). Attaching the token we stored
// on login as a Bearer header makes auth work regardless of cookie policy.
export function authFetch(url, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { credentials: "include", ...options, headers });
}
