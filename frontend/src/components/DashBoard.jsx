import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { fetchAppliedJobs } from "../api/jobs";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchAppliedJobs().then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-20">
        <header className="flex items-center justify-between max-w-5xl mx-auto py-8 px-6 mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            My Job Listings
          </h1>
        </header>
        <main className="max-w-5xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-20">
                <svg
                  className="mx-auto mb-4 w-16 h-16 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <p className="text-lg">No jobs applied yet.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow relative group"
                >
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        job.status === "approved"
                          ? "bg-green-600 text-green-100"
                          : job.status === "pending"
                          ? "bg-yellow-600 text-yellow-100"
                          : "bg-red-600 text-red-100"
                      }`}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location || "N/A"}
                  </p>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Salary</span>
                      <span className="text-lg font-semibold text-blue-400">
                        ₹ {job.budget}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ID: <span className="font-mono">{job._id.slice(-6)}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
