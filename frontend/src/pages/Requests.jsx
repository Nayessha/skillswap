import { useEffect, useState } from "react";
import { api } from "../api";

export default function Requests() {
  const [myRequests, setMyRequests] = useState([]);
  const [forMe, setForMe] = useState([]);

  useEffect(() => {
    api.get("/requests/mine")
      .then(res => setMyRequests(res.data))
      .catch(err => console.log(err));

    api.get("/requests/for-me")
      .then(res => setForMe(res.data))
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (requestId, status) => {
    await api.post("/requests/update-status", {
      requestId,
      status
    });
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Requests</h2>

      <h3 className="text-lg font-semibold mt-6">Requests I Sent</h3>
      {myRequests.map(req => (
        <div key={req.id} className="bg-white p-3 rounded shadow mb-2">
          <p>Status: {req.status}</p>
        </div>
      ))}

      <h3 className="text-lg font-semibold mt-6">Requests For Me</h3>
      {forMe.map(req => (
        <div key={req.id} className="bg-white p-3 rounded shadow mb-2">
          <p>Status: {req.status}</p>

          {req.status === "PENDING" && (
            <>
              <button
                onClick={() => updateStatus(req.id, "ACCEPTED")}
                className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(req.id, "REJECTED")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}