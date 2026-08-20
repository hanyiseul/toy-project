import { Bell, Check, ChevronLeft, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

const API = "http://localhost:4000/api";

export default function InteractionPanel({ open, user, onClose, onCompleted }) {
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    fetch(`${API}/interaction/notifications`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => setNotifications([]));
    fetch(`${API}/interaction/conversations`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setConversations(data.conversations || []))
      .catch(() => setConversations([]));
  }, [open, user]);

  useEffect(() => {
    if (!activeConversation) return;
    fetch(`${API}/interaction/conversations/${activeConversation.id}/messages`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => setMessages([]));
  }, [activeConversation]);

  if (!open) return null;
  const pending = notifications.filter((notification) => !notification.isRead);
  const accept = async (requestId) => {
    const response = await fetch(`${API}/interaction/requests/${requestId}`, {
      method: "PATCH",
      credentials: "include",
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
    const conversationResponse = await fetch(`${API}/interaction/conversations`, {
      credentials: "include",
    });
    const conversationData = await conversationResponse.json();
    setConversations(conversationData.conversations || []);
  };
  const startChat = async () => {
    const response = await fetch(`${API}/interaction/conversations`, {
      credentials: "include",
    });
    const data = await response.json();
    if (data.conversations?.[0]) {
      setConversations(data.conversations);
      setActiveConversation(data.conversations[0]);
      setComplete(false);
    }
  };
  const send = async (event) => {
    event.preventDefault();
    if (!draft.trim() || !activeConversation) return;
    const response = await fetch(
      `${API}/interaction/conversations/${activeConversation.id}/messages`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: draft }),
      },
    );
    if (response.ok) {
      const message = await response.json();
      setMessages((current) => [...current, message]);
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
                <p>{pending.length}개의 새로운 신청이 있어요.</p>
              </div>
              <button onClick={onClose}>
                <X size={19} />
              </button>
            </header>
            <div className="request-list">
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
                  <button onClick={() => accept(notification.requestId)}>
                    수락
                  </button>
                </article>
              ))}
              {!pending.length && (
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
