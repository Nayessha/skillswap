import { useState } from "react";
import { api } from "../api";

const SKILL_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "AI / ML",
  "Data Science",
  "Cyber Security",
  "Cloud Computing",
  "DevOps",
  "Blockchain",
  "Video Editing",
  "Content Writing",
  "Public Speaking",
  "Music",
  "Fitness",
  "Other"
];

export default function AddSkill() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    if (!title || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/skills/add", {
        title,
        category
      });

      setTitle("");
      setCategory("");
      alert("Skill added successfully");
    } catch (err) {
      console.log(err);
      alert("Error adding skill");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Skill</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Skill title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-64"
        >
          <option value="">Select Category</option>
          {SKILL_CATEGORIES.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}