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
            <div key={index} className="bg-white p-4 rounded shadow">
              <p><strong>User:</strong> {match.user?.name}</p>
              <p><strong>Skill:</strong> {match.skill?.title}</p>

            
            </div>
          ))}
        </div>
      )}
    </div>
    </motion.div>
  );
}
export default Matches;