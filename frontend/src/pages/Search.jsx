import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const searchTeachers = async () => {
    try {
      const res = await api.get(
        `/skills/recommend?title=${title}&category=${category}`
      );
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Find Teachers</h2>

      <input
        placeholder="Skill"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={searchTeachers}
        className="bg-indigo-600 text-white px-4 py-2"
      >
        Search
      </button>

      <div className="mt-6">
        {results.map(teacher => (
          <div key={teacher.teacherId} className="bg-white p-4 shadow mb-3">
            <p><strong>Name:</strong> {teacher.teacherName}</p>
            <p><strong>Rating:</strong> ⭐ {teacher.averageRating.toFixed(1)}</p>

            <button
              onClick={() => navigate("/matches")}
              className="bg-green-500 text-white px-3 py-1 mt-2"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}