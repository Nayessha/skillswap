import { useEffect, useState } from "react";
import { api } from "../api";
import { motion } from "framer-motion";

function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </motion.div>
  );
}
function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get("/match")
      .then(res => setMatches(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Matches</h2>

      {matches.length === 0 ? (
        <p className="text-gray-600">No matches found</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p><strong>User:</strong> {match.user?.name}</p>
              <p><strong>Skill:</strong> {match.skill?.title}</p>

              <button
                onClick={() => {
                  if (!match.skill?.id) return;

                  api.post("/requests/send", {
                    skillId: match.skill.id
                  })
                  .then(() => alert("Request sent!"))
                  .catch(err => {
                    console.log(err);
                    alert("Error sending request");
                  });
                }}
                className="bg-indigo-600 text-white px-3 py-1 rounded mt-2"
              >
                Send Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Dashboard;