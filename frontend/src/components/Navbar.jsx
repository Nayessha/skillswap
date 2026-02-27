export default function Navbar() {
  return (
    <div className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Synaptex</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="bg-white text-indigo-600 px-4 py-2 rounded-lg"
      >

        Logout
      </button>
      
    </div>
  );
}