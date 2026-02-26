export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">My Skills</h3>
          <p className="text-3xl mt-2">4</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Wanted Skills</h3>
          <p className="text-3xl mt-2">3</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Matches</h3>
          <p className="text-3xl mt-2">2</p>
        </div>
      </div>
    </div>
  );
}