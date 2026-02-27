import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const [myRequests, setMyRequests] = useState([]);
  const [forMe, setForMe] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    api.get("/requests/mine")
      .then(res => setMyRequests(res.data))
      .catch(err => console.log(err));

    api.get("/requests/for-me")
      .then(res => setForMe(res.data))
      .catch(err => console.log(err));
  };

  const updateStatus = async (requestId, status) => {
    try {
      await api.post("/requests/update-status", {
        requestId,
        status
      });
      loadRequests();
    } catch (err) {
      console.log(err);
      alert("Error updating request");
    }
  };

  const completeRequest = async (requestId) => {
    try {
      await api.post("/requests/complete", { requestId });
      loadRequests();
    } catch (err) {
      console.log(err);
      alert("Error completing request");
    }
  };

  const submitRating = async (userId, value) => {
    try {
      await api.post("/ratings/add", {
        userId,
        value
      });
      alert("Rating submitted");
    } catch (err) {
      console.log(err);
      alert("Error submitting rating");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requests</h2>

      {/* SENT REQUESTS */}
      <h3 className="text-lg font-semibold mt-6">Requests I Sent</h3>
      {myRequests.map(req => (
        <div key={req.id} className="bg-white p-4 rounded shadow mb-3">
          <p><strong>Skill:</strong> {req.skill?.title}</p>
          <p><strong>Status:</strong> {req.status}</p>

          {req.status === "accepted" && (
            <>
              <button
                onClick={() => navigate(`/chat/${req.id}`)}
                className="bg-indigo-600 text-white px-3 py-1 rounded mt-2 mr-2"
              >
                Chat
              </button>

              <button
                onClick={() => completeRequest(req.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mt-2"
              >
                Mark Completed
              </button>
            </>
          )}

          {req.status === "completed" && (
            <div className="mt-3">
              <p className="mb-1 font-medium">Rate this user:</p>
              {[1,2,3,4,5].map(num => (
                <button
                  key={num}
                  onClick={() => submitRating(req.skill?.userId, num)}
                  className="bg-yellow-400 px-3 py-1 mr-2 rounded"
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* RECEIVED REQUESTS */}
      <h3 className="text-lg font-semibold mt-8">Requests For Me</h3>
      {forMe.map(req => (
        <div key={req.id} className="bg-white p-4 rounded shadow mb-3">
          <p><strong>From:</strong> {req.requester?.name}</p>
          <p><strong>Skill:</strong> {req.skill?.title}</p>
          <p><strong>Status:</strong> {req.status}</p>

          {req.status === "pending" && (
            <>
              <button
                onClick={() => updateStatus(req.id, "accepted")}
                className="bg-green-500 text-white px-3 py-1 mr-2 rounded mt-2"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(req.id, "rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Reject
              </button>
            </>
          )}

          {req.status === "accepted" && (
            <>
              <button
                onClick={() => navigate(`/chat/${req.id}`)}
                className="bg-indigo-600 text-white px-3 py-1 rounded mt-2 mr-2"
              >
                Chat
              </button>

              <button
                onClick={() => completeRequest(req.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mt-2"
              >
                Mark Completed
              </button>
            </>
          )}

          {req.status === "completed" && (
            <div className="mt-3">
              <p className="mb-1 font-medium">Rate requester:</p>
              {[1,2,3,4,5].map(num => (
                <button
                  key={num}
                  onClick={() => submitRating(req.requester?.id, num)}
                  className="bg-yellow-400 px-3 py-1 mr-2 rounded"
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}