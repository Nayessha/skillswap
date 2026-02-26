import { useParams } from "react-router-dom";

export default function Chat() {
  const { requestId } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <p>Chat enabled for request ID: {requestId}</p>

      <div className="bg-white p-4 rounded shadow mt-4">
        <p className="text-gray-500">
          Messaging system will appear here.
        </p>
      </div>
    </div>
  );
}