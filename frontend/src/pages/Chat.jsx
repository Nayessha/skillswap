import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

function Chat() {
  const { requestId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

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
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>

      <div className="bg-white p-4 rounded-xl shadow h-80 overflow-y-auto mb-4">
        {messages.map(msg => (
          <div key={msg.id} className="mb-2">
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;