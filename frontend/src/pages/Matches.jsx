import { useEffect, useState } from "react";
import { api } from "../api";
import { motion } from "framer-motion";

function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get("/match")
      .then(res => setMatches(res.data))
      .catch(err => console.log(err));
  }, []);

  const sendRequest = async (receiverId, skillTitle) => {
    try {
      await api.post("/requests/send", {
        receiverId,
        skillTitle
      });

      alert("Request sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-6">Matches</h2>

        {matches.length === 0 ? (
          <p className="text-gray-600">No matches found</p>
        ) : (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow hover:-translate-y-1 transition"
              >
                <p><strong>User:</strong> {match.user?.name}</p>
                <p><strong>Skill:</strong> {match.skill?.title}</p>

                <button
                  onClick={() =>
                    sendRequest(match.user.id, match.skill.title)
                  }
                  className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                >
                  Send Request
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Matches;