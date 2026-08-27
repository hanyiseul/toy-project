import { Bell, Check, ChevronLeft, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSocket } from "../../services/socket";
import { API_URL as API } from "../../config/api";
import { authFetch } from "../../services/authFetch";

export default function InteractionPanel({
  open,
  user,
  onClose,
  onCompleted,
  onNotificationRead,
}) {
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    authFetch(`${API}/interaction/notifications`)
      .then((response) => response.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => setNotifications([]));
    authFetch(`${API}/interaction/conversations`)
      .then((response) => response.json())
      .then((data) => setConversations(data.conversations || []))
      .catch(() => setConversations([]));
  }, [open, user]);

  useEffect(() => {
    if (!activeConversation) return;
    authFetch(`${API}/interaction/conversations/${activeConversation.id}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => setMessages([]));
  }, [activeConversation]);

  useEffect(() => {
    if (!activeConversation) return;
    const socket = getSocket();
    if (!socket) return;
    socket.connect();
    socket.emit("conversation:join", activeConversation.id);
    const handleMessage = (message) => {
      if (String(message.conversationId) !== String(activeConversation.id))
        return;
      setMessages((current) =>
        current.some((item) => item.id === message.id)
          ? current
          : [...current, message],
      );
    };
    socket.on("message:new", handleMessage);
    return () => {
      socket.emit("conversation:leave", activeConversation.id);
      socket.off("message:new", handleMessage);
    };
  }, [activeConversation]);

  useEffect(() => {
    if (!user) return;
    const socket = getSocket();
    if (!socket) return;
    socket.connect();
    const refresh = () => {
      authFetch(`${API}/interaction/notifications`)
        .then((response) => response.json())
        .then((data) => setNotifications(data.notifications || []))
        .catch(() => {});
      authFetch(`${API}/interaction/conversations`)
        .then((response) => response.json())
        .then((data) => setConversations(data.conversations || []))
        .catch(() => {});
    };
    socket.on("notification:new", refresh);
    return () => socket.off("notification:new", refresh);
  }, [user]);

  if (!open) return null;
  const unread = notifications.filter((notification) => !notification.isRead);
  const pending = unread.filter(
    (notification) => notification.type === "match_request",
  );
  const matchUpdates = unread.filter(
    (notification) => notification.type === "match_accepted",
  );
  const accept = async (requestId) => {
    const response = await authFetch(`${API}/interaction/requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "accepted" }),
    });
    if (!response.ok) return;
    const result = await response.json();
    setComplete(true);
    onCompleted?.(result);
    setNotifications((current) =>
      current.filter((notification) => notification.requestId !== requestId),
    );
    const conversationResponse = await authFetch(`${API}/interaction/conversations`);
    const conversationData = await conversationResponse.json();
    setConversations(conversationData.conversations || []);
  };
  const reject = async (requestId) => {
    const response = await authFetch(`${API}/interaction/requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });
    if (!response.ok) return;
    setNotifications((current) =>
      current.filter((notification) => notification.requestId !== requestId),
    );
    onNotificationRead?.();
  };
  const startChat = async () => {
    const response = await authFetch(`${API}/interaction/conversations`);
    const data = await response.json();
    if (data.conversations?.[0]) {
      setConversations(data.conversations);
      setActiveConversation(data.conversations[0]);
      setComplete(false);
    }
  };
  const openMatchedChat = async (notificationId) => {
    authFetch(`${API}/interaction/notifications/${notificationId}/read`, {
      method: "PATCH",
    }).catch(() => {});
    setNotifications((current) =>
      current.filter((notification) => notification.id !== notificationId),
    );
    onNotificationRead?.();
    await startChat();
  };
  const send = async (event) => {
    event.preventDefault();
    if (!draft.trim() || !activeConversation) return;
    const response = await authFetch(
      `${API}/interaction/conversations/${activeConversation.id}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: draft }),
      },
    );
    if (response.ok) {
      const message = await response.json();
      setMessages((current) =>
        current.some((item) => item.id === message.id)
          ? current
          : [...current, message],
      );
      setDraft("");
    }
  };

  return (
    <div className="interaction-backdrop" onClick={onClose}>
      <aside
        className="interaction-sheet"
        onClick={(event) => event.stopPropagation()}
      >
        {activeConversation ? (
          <>
            <header className="interaction-header">
              <button onClick={() => setActiveConversation(null)}>
                <ChevronLeft size={20} />
              </button>
              <strong>{activeConversation.partnerName}와 채팅</strong>
              <button onClick={onClose}>
                <X size={19} />
              </button>
            </header>
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  className={
                    String(message.senderId) === String(user?.id)
                      ? "chat-message mine"
                      : "chat-message"
                  }
                  key={message.id}
                >
                  {message.body}
                </div>
              ))}
            </div>
            <form className="chat-form" onSubmit={send}>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="메시지를 입력하세요"
              />
              <button>
                <Send size={17} />
              </button>
            </form>
          </>
        ) : complete ? (
          <>
            <div className="match-complete">
              <div className="complete-icon">
                <Check size={28} />
              </div>
              <h2>매칭이 완료됐어요</h2>
              <p>
                이제 파트너와 코스에 대해
                <br />
                편하게 이야기해보세요.
              </p>
              <button className="complete-button" onClick={startChat}>
                <MessageCircle size={17} /> 채팅 시작하기
              </button>
            </div>
          </>
        ) : (
          <>
            <header className="interaction-header">
              <div>
                <span className="notification-kicker">
                  <Bell size={14} /> MATCHING
                </span>
                <h2>매칭 신청 알림</h2>
                <p>{pending.length + matchUpdates.length}개의 새로운 소식이 있어요.</p>
              </div>
              <button onClick={onClose}>
                <X size={19} />
              </button>
            </header>
            <div className="request-list">
              {matchUpdates.map((notification) => (
                <article
                  className="request-card match-update-card"
                  key={notification.id}
                >
                  <div className="request-avatar">
                    {notification.requesterName?.[0] || "♥"}
                  </div>
                  <div>
                    <strong>
                      {notification.requesterName || "파트너"}
                      {notification.requesterAge
                        ? `, ${notification.requesterAge}`
                        : ""}
                    </strong>
                    <p>매칭 되었어요! 이제 채팅할 수 있어요.</p>
                  </div>
                  <button onClick={() => openMatchedChat(notification.id)}>
                    채팅하기
                  </button>
                </article>
              ))}
              {pending.map((notification) => (
                <article className="request-card" key={notification.id}>
                  <div className="request-avatar">
                    {notification.requesterName?.[0] || "♥"}
                  </div>
                  <div>
                    <strong>
                      {notification.requesterName || "파트너"}
                      {notification.requesterAge
                        ? `, ${notification.requesterAge}`
                        : ""}
                    </strong>
                    <p>데이트 코스를 함께하고 싶어해요.</p>
                  </div>
                  <div className="request-card-actions">
                    <button
                      className="reject-button"
                      onClick={() => reject(notification.requestId)}
                    >
                      거절
                    </button>
                    <button onClick={() => accept(notification.requestId)}>
                      수락
                    </button>
                  </div>
                </article>
              ))}
              {!pending.length && !matchUpdates.length && (
                <div className="empty-interaction">
                  <Bell size={24} />
                  <p>새로운 매칭 신청이 없어요.</p>
                </div>
              )}
            </div>
            {conversations.length > 0 && (
              <div className="conversation-section">
                <h3>
                  <MessageCircle size={15} /> 매칭 완료된 채팅
                </h3>
                {conversations.map((conversation) => (
                  <button
                    className="conversation-row"
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    {conversation.partnerName} <span>채팅하기 →</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
