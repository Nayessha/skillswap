import { useState } from "react";
import { api } from "../api";
import { motion } from "framer-motion";

function AddSkill() {
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

const categories = [
  "Technical",
  "E-commerce",
  "Fashion",
  "Performing Arts",
  "Fine Arts",
  "Finance",
  "Design",
  "Vocational",
  "Literature",
  "Fitness",
  "Others"
];

function AddSkill() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    if (!title || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/skills/add", { title, category });
      setTitle("");
      setCategory("");
      alert("Skill added successfully");
    } catch (err) {
      console.log(err);
      alert("Error adding skill");
    }
  };

  return (
    <div className="flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add a Skill
        </h2>

        <div className="space-y-6">

          {/* Skill Title */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Skill Title
            </label>
            <input
              type="text"
              placeholder="e.g. React Development"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 
                         focus:ring-2 focus:ring-indigo-500 
                         focus:outline-none transition duration-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 
                         focus:ring-2 focus:ring-indigo-500 
                         focus:outline-none transition duration-200"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            onClick={handleAdd}
            className="w-full bg-indigo-600 hover:bg-indigo-700 
                       text-white font-semibold py-3 rounded-xl 
                       shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-0.5 
                       transition duration-200"
          >
            Add Skill
          </button>

        </div>
      </div>
    </div>
  );
}
export default AddSkill;