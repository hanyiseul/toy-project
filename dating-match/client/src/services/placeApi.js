import { API_URL } from "../config/api";
import { authFetch } from "./authFetch";

async function request(path, options) {
  const response = await authFetch(`${API_URL}${path}`, options);
  if (!response.ok) throw new Error("API request failed");
  return response.json();
}

export const placeApi = {
  getRecommendations: (params) =>
    request(`/places?${new URLSearchParams(params)}`),
  sendFeedback: (placeId, value) =>
    request("/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId, value }),
    }),
  saveProfile: (profile) =>
    request("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }),
  saveCourse: (ids) =>
    request("/course/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    }),
};
