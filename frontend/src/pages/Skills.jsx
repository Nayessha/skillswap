import { useEffect, useState } from "react";
import { api } from "../api";
import { motion } from "framer-motion";


function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get("/skills/my")
      .then(res => setSkills(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
    <div>
      <h2 className="text-2xl font-bold mb-6">My Skills</h2>

      <div className="grid grid-cols-3 gap-4">
        {skills.map(skill => (
          <div key={skill.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{skill.title}</h3>
            <p className="text-sm text-gray-500">{skill.category}</p>
          </div>
        ))}
      </div>
      
    </div>
    </motion.div>
  );
}
export default Skills;