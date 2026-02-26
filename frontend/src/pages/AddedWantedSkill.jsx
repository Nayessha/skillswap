import { useState } from "react";
import { api } from "../api";

export default function AddWantedSkill() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/skills/wanted", { title, category });
      alert("Wanted skill added!");
      setTitle("");
      setCategory("");
    } catch (err) {
      console.log(err);
      alert("Error adding wanted skill");
    }
  };

  return (
    <div>
      <h2>Add Wanted Skill</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}