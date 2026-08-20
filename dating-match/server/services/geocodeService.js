const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function geocodeLocation(text) {
  if (!text) return null;
  const params = new URLSearchParams({
    format: "json",
    limit: "1",
    q: `${text}, Seoul, South Korea`,
  });
  try {
    const response = await fetch(`${NOMINATIM_URL}?${params}`, {
      headers: { "User-Agent": "dating-match-dev-app/1.0" },
    });
    if (!response.ok) return null;
    const results = await response.json();
    if (!results.length) return null;
    return { lat: Number(results[0].lat), lng: Number(results[0].lon) };
  } catch {
    return null;
  }
}
