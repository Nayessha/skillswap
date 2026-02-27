<div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white min-h-screen p-6 shadow-xl">
  <h1 className="text-3xl font-extrabold mb-8 tracking-wide">
    SkillSwap
  </h1>

  <nav className="flex flex-col space-y-3 text-lg">
    <Link to="/dashboard" className="hover:bg-white/10 p-2 rounded transition">Dashboard</Link>
    <Link to="/skills" className="hover:bg-white/10 p-2 rounded transition">My Skills</Link>
    <Link to="/add-skill" className="hover:bg-white/10 p-2 rounded transition">Add Skill</Link>
    <Link to="/matches" className="hover:bg-white/10 p-2 rounded transition">Matches</Link>
    <Link to="/requests" className="hover:bg-white/10 p-2 rounded transition">Requests</Link>
    <Link to="/add-wanted" className="hover:bg-white/10 p-2 rounded transition">Add Wanted Skill</Link>
    <Link to="/find-teachers" className="hover:bg-white/10 p-2 rounded transition">Find Teachers</Link>
  </nav>
  <button
        onClick={handleLogout}
        className="mt-10 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
            Logout
  </button>
</div>
