import { useState } from "react";
import { api } from "../api";

export default function AddSkill() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/skills/add", { title, category });
      alert("Skill added!");
      setTitle("");
      setCategory("");
    } catch (err) {
      alert("Error adding skill");
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Add Skill</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}