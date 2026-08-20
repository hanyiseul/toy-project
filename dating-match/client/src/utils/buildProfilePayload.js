export function buildProfilePayload(form) {
  return {
    type: form.type,
    nationality: form.country,
    ageRange: form.age,
    gender: form.gender,
    visa: form.visa,
    matching: form.matching,
    matchTarget: form.matchTarget,
    photoUrl: form.photoUrl,
    cuisine: form.cuisine,
    location: form.location,
  };
}
