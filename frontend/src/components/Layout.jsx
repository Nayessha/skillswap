import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white p-6 flex flex-col">

        <div>
          <h1 className="text-3xl font-bold mb-8">SkillSwap</h1>

          <nav className="flex flex-col space-y-4 text-lg">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/skills">My Skills</Link>
            <Link to="/add-skill">Add Skill</Link>
            <Link to="/matches">Matches</Link>
            <Link to="/requests">Requests</Link>
            <Link to="/add-wanted">Add Wanted Skill</Link>
            <Link to="/search">Find Teachers</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 p-10">
        {children}
      </div>

    </div>
  );
}