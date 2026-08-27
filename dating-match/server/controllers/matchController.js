import { findUserById } from "../data/authRepository.js";
import { listMatches, requestMatch } from "../services/matchService.js";
import { emitToUser } from "../realtime/socket.js";

export async function getMatches(req, res, next) {
  try {
    const me = await findUserById(req.user.sub);
    if (!me?.matchingEnabled || !me?.matchTarget) {
      return res.json({ matches: [], pagination: { page: 1, limit: 10, total: 0, pages: 1 } });
    }
    res.json(await listMatches(req.query, req.user.sub, me.matchTarget));
  } catch (error) {
    next(error);
  }
}

export async function applyMatch(req, res, next) {
  const { partnerId } = req.body;
  if (!partnerId)
    return res
      .status(400)
      .json({ message: "userId와 partnerId가 필요합니다." });
  try {
    const result = await requestMatch(req.user.sub, partnerId);
    emitToUser(partnerId, "notification:new", {
      type: "match_request",
      requestId: result.requestId,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
