import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function Chat() {
  const { requestId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  // 🔥 Decode JWT to get userId
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setCurrentUserId(payload.id);
    }
  }, []);

  const loadMessages = async () => {
    try {
      const res = await api.get(`/messages/${requestId}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [requestId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await api.post("/messages/send", {
        requestId: Number(requestId),
        content: text
      });

      setText("");
      loadMessages();
    } catch (err) {
      console.log(err);
      alert("Error sending message");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>

      <div className="bg-white p-4 rounded shadow h-64 overflow-y-auto mb-4">
        {messages.map(msg => {
          const isMe = msg.senderId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-2 rounded max-w-xs ${
                  isMe
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <strong>
                  {isMe ? "You" : msg.sender?.name}
                </strong>
                <div>{msg.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}