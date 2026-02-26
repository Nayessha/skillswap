import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const [myRequests, setMyRequests] = useState([]);
  const [forMe, setForMe] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/requests/mine")
      .then(res => setMyRequests(res.data))
      .catch(err => console.log(err));

    api.get("/requests/for-me")
      .then(res => setForMe(res.data))
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (requestId, status) => {
    try {
      await api.post("/requests/update-status", {
        requestId,
        status
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error updating request");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Requests</h2>

      {/* SENT REQUESTS */}
      <h3 className="text-lg font-semibold mt-6">Requests I Sent</h3>
      {myRequests.map(req => (
        <div key={req.id} className="bg-white p-3 rounded shadow mb-2">
          <p><strong>Skill:</strong> {req.skill?.title}</p>
          <p><strong>Status:</strong> {req.status}</p>

          {req.status === "accepted" && (
            <button
              onClick={() => navigate(`/chat/${req.id}`)}
              className="bg-indigo-600 text-white px-3 py-1 rounded mt-2"
            >
              Chat
            </button>
          )}
        </div>
      ))}

      {/* RECEIVED REQUESTS */}
      <h3 className="text-lg font-semibold mt-6">Requests For Me</h3>
      {forMe.map(req => (
        <div key={req.id} className="bg-white p-3 rounded shadow mb-2">
          <p><strong>From:</strong> {req.requester?.name}</p>
          <p><strong>Skill:</strong> {req.skill?.title}</p>
          <p><strong>Status:</strong> {req.status}</p>

          {req.status === "pending" && (
            <>
              <button
                onClick={() => updateStatus(req.id, "accepted")}
                className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(req.id, "rejected")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Reject
              </button>
            </>
          )}

          {req.status === "accepted" && (
            <button
              onClick={() => navigate(`/chat/${req.id}`)}
              className="bg-indigo-600 text-white px-3 py-1 rounded mt-2"
            >
              Chat
            </button>
          )}
        </div>
      ))}
    </div>
  );
}