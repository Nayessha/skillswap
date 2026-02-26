import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">SkillSwap</h1>

        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          <Link to="/skills" className="hover:text-gray-200">My Skills</Link>
          <Link to="/add-skill" className="hover:text-gray-200">Add Skill</Link>
          <Link to="/matches" className="hover:text-gray-200">Matches</Link>
          <Link to="/requests" className="hover:text-gray-200">Requests</Link>
          <Link to="/add-wanted" className="hover:text-gray-200">Add Wanted Skill</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}