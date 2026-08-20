const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
  });
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
