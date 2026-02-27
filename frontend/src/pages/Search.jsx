import { useState } from "react";
import { api } from "../api";

export default function Search() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [teachers, setTeachers] = useState([]);

  const searchTeachers = async () => {
    try {
      const res = await api.get(
        `/skills/recommend?title=${title}&category=${category}`
      );
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching teachers");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Find Top Teachers
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg flex gap-4 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Skill (e.g. Singing)"
          className="border p-3 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g. Music)"
          className="border p-3 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={searchTeachers}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition shadow-md"
        >
          Search
        </button>
      </div>

      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className="bg-white p-6 rounded-xl shadow-lg mb-4 hover:shadow-2xl transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            {teacher.name}
          </h3>

          <p className="text-yellow-500 font-medium mt-1">
            ⭐ {teacher.avgRating?.toFixed(1) || "No ratings yet"}
          </p>
        </div>
      ))}
    </div>
  );
}