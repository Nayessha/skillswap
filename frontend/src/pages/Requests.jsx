import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



function Requests() {
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
      await api.post("/requests/update-status", { requestId, status });
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
      await api.post("/ratings/add", { userId, value });
      alert("Rating submitted ⭐");
    } catch (err) {
      console.log(err);
      alert("Error submitting rating");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Requests
      </h2>

      {/* SENT REQUESTS */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Requests I Sent
        </h3>

        {myRequests.map(req => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-xl shadow-md mb-4 hover:shadow-xl transition"
          >
            <p className="text-lg font-medium text-gray-800">
              {req.skill?.title}
            </p>

            <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${statusColor(req.status)}`}>
              {req.status}
            </span>

            <div className="mt-4 flex gap-3 flex-wrap">
              {req.status === "accepted" && (
                <>
                  <button
                    onClick={() => navigate(`/chat/${req.id}`)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Chat
                  </button>

                  <button
                    onClick={() => completeRequest(req.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Mark Completed
                  </button>
                </>
              )}

              {req.status === "completed" && (
                <div className="flex gap-2 mt-2">
                  {[1,2,3,4,5].map(num => (
                    <button
                      key={num}
                      onClick={() => submitRating(req.skill?.userId, num)}
                      className="text-2xl hover:scale-110 transition"
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RECEIVED REQUESTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Requests For Me
        </h3>

        {forMe.map(req => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-xl shadow-md mb-4 hover:shadow-xl transition"
          >
            <p className="text-lg font-medium text-gray-800">
              From: {req.requester?.name}
            </p>

            <p className="text-gray-600 mt-1">
              Skill: {req.skill?.title}
            </p>

            <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${statusColor(req.status)}`}>
              {req.status}
            </span>

            <div className="mt-4 flex gap-3 flex-wrap">
              {req.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(req.id, "accepted")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(req.id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Reject
                  </button>
                </>
              )}

              {req.status === "accepted" && (
                <>
                  <button
                    onClick={() => navigate(`/chat/${req.id}`)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Chat
                  </button>

                  <button
                    onClick={() => completeRequest(req.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Mark Completed
                  </button>
                </>
              )}

              {req.status === "completed" && (
                <div className="flex gap-2 mt-2">
                  {[1,2,3,4,5].map(num => (
                    <button
                      key={num}
                      onClick={() => submitRating(req.requester?.id, num)}
                      className="text-2xl hover:scale-110 transition"
                    >
                      ⭐
                    </button>
                    
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary">
        Requests
      </button>
    </div>
    </motion.div>
  );
}
export default Requests;