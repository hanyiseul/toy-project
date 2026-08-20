export function saveFeedback(req, res) {
  const { placeId, value } = req.body;
  if (!placeId || !["up", "down"].includes(value))
    return res
      .status(400)
      .json({ message: "placeId와 feedback value가 필요합니다." });
  res.status(201).json({ saved: true, placeId, value });
}
