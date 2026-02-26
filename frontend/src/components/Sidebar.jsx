import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-6 space-y-4">
      <Link to="/dashboard" className="block hover:text-indigo-600">
        Dashboard
      </Link>
      <Link to="/skills" className="block hover:text-indigo-600">
        Skills
      </Link>
      <Link to="/matches" className="block hover:text-indigo-600">
        Matches
      </Link>
      <Link to="/requests" className="block hover:text-indigo-600">
        Requests
      </Link>
      <Link to="/profile" className="block hover:text-indigo-600">
        Profile
      </Link>
    </div>
  );
}