import { query } from "../config/database.js";

const fallback = {
  requests: [
    {
      id: 1,
      requesterId: 2,
      requesterName: "김지우",
      requesterAge: 29,
      status: "requested",
      createdAt: new Date().toISOString(),
    },
  ],
  notifications: [],
  conversations: [],
  messages: {},
};

export async function listNotifications(userId) {
  try {
    return await query(
      `SELECT n.id, n.type, n.is_read AS isRead, n.match_request_id AS requestId, n.created_at AS createdAt, u.nickname AS requesterName, u.age AS requesterAge FROM notifications n LEFT JOIN match_requests r ON r.id = n.match_request_id LEFT JOIN users u ON u.id = r.requester_id WHERE n.user_id = ? ORDER BY n.created_at DESC`,
      [userId],
    );
  } catch (error) {
    console.warn("Using fallback notifications:", error.message);
    return fallback.notifications
      .filter((notification) => notification.userId === Number(userId))
      .map((notification) => ({
        ...notification,
        requesterName: "김지우",
        requesterAge: 29,
      }));
  }
}

export async function respondToRequest(requestId, userId, status) {
  try {
    const rows = await query(
      "SELECT id, requester_id AS requesterId, partner_id AS partnerId FROM match_requests WHERE id = ? AND partner_id = ?",
      [requestId, userId],
    );
    if (!rows.length) {
      const fallbackRequest = fallback.requests.find(
        (request) => request.id === Number(requestId),
      );
      if (!fallbackRequest) throw new Error("MATCH_REQUEST_NOT_FOUND");
      fallbackRequest.status = status;
      if (status === "accepted") {
        const conversationId = 1;
        fallback.conversations = [
          {
            id: conversationId,
            partnerName: fallbackRequest.requesterName,
            partnerAge: fallbackRequest.requesterAge,
          },
        ];
        return { requestId: fallbackRequest.id, conversationId, status };
      }
      return { requestId: fallbackRequest.id, status };
    }
    await query("UPDATE match_requests SET status = ? WHERE id = ?", [
      status,
      requestId,
    ]);
    if (status !== "accepted") return { requestId: Number(requestId), status };
    const result = await query(
      "INSERT INTO conversations (match_request_id) VALUES (?) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)",
      [requestId],
    );
    await query(
      "INSERT INTO notifications (user_id, type, match_request_id) VALUES (?, 'match_accepted', ?)",
      [rows[0].requesterId, requestId],
    );
    return {
      requestId: Number(requestId),
      conversationId: result.insertId,
      status: "accepted",
    };
  } catch (error) {
    if (error.message === "MATCH_REQUEST_NOT_FOUND") throw error;
    console.warn("Using fallback request response:", error.message);
    const request = fallback.requests.find(
      (item) => item.id === Number(requestId),
    );
    if (!request) throw new Error("MATCH_REQUEST_NOT_FOUND");
    request.status = status;
    if (status === "accepted") {
      const conversationId = 1;
      fallback.conversations = [
        {
          id: conversationId,
          partnerName: request.requesterName,
          partnerAge: request.requesterAge,
        },
      ];
      return { requestId: request.id, conversationId, status };
    }
    return { requestId: request.id, status };
  }
}

export async function listConversations(userId) {
  try {
    return await query(
      `SELECT c.id, r.id AS requestId, CASE WHEN r.requester_id = ? THEN p.nickname ELSE u.nickname END AS partnerName, CASE WHEN r.requester_id = ? THEN p.age ELSE u.age END AS partnerAge FROM conversations c JOIN match_requests r ON r.id = c.match_request_id JOIN users u ON u.id = r.requester_id JOIN users p ON p.id = r.partner_id WHERE r.requester_id = ? OR r.partner_id = ? ORDER BY c.created_at DESC`,
      [userId, userId, userId, userId],
    );
  } catch (error) {
    console.warn("Using fallback conversations:", error.message);
    return fallback.conversations;
  }
}

export async function listMessages(conversationId) {
  try {
    return await query(
      "SELECT id, sender_id AS senderId, body, created_at AS createdAt FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
      [conversationId],
    );
  } catch (error) {
    console.warn("Using fallback messages:", error.message);
    return (
      fallback.messages[conversationId] || [
        {
          id: 1,
          senderId: 2,
          body: "안녕하세요! 코스가 마음에 들어요.",
          createdAt: new Date().toISOString(),
        },
      ]
    );
  }
}

export async function createMessage(conversationId, senderId, body) {
  try {
    const result = await query(
      "INSERT INTO messages (conversation_id, sender_id, body) VALUES (?, ?, ?)",
      [conversationId, senderId, body],
    );
    return { id: result.insertId, conversationId, senderId, body };
  } catch (error) {
    console.warn("Using fallback message:", error.message);
    const message = {
      id: Date.now(),
      conversationId,
      senderId,
      body,
      createdAt: new Date().toISOString(),
    };
    fallback.messages[conversationId] = [
      ...(fallback.messages[conversationId] || []),
      message,
    ];
    return message;
  }
}
