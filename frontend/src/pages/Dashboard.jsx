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

function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [wanted, setWanted] = useState([]);

  useEffect(() => {
    api.get("/skills/my")
      .then(res => setSkills(res.data))
      .catch(err => console.log(err));

    api.get("/skills/wanted")
      .then(res => setWanted(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">My Skills</h3>
          <p className="text-3xl mt-2">{skills.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Wanted Skills</h3>
          <p className="text-3xl mt-2">{wanted.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Matches</h3>
          <p className="text-3xl mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;