import {
  createMessage,
  listConversations,
  listMessages,
  listNotifications,
  respondToRequest,
} from "../data/interactionRepository.js";

export async function getNotifications(req, res, next) {
  try {
    res.json({ notifications: await listNotifications(req.user.sub) });
  } catch (error) {
    next(error);
  }
}

export async function updateRequest(req, res, next) {
  try {
    res.json(
      await respondToRequest(
        req.params.requestId,
        req.user.sub,
        req.body.status,
      ),
    );
  } catch (error) {
    next(error);
  }
}

export async function getConversations(req, res, next) {
  try {
    res.json({ conversations: await listConversations(req.user.sub) });
  } catch (error) {
    next(error);
  }
}

export async function getConversationMessages(req, res, next) {
  try {
    res.json({ messages: await listMessages(req.params.conversationId) });
  } catch (error) {
    next(error);
  }
}

export async function postMessage(req, res, next) {
  if (!req.body.body?.trim())
    return res.status(400).json({ message: "메시지를 입력해주세요." });
  try {
    res
      .status(201)
      .json(
        await createMessage(
          req.params.conversationId,
          req.user.sub,
          req.body.body.trim(),
        ),
      );
  } catch (error) {
    next(error);
  }
}
