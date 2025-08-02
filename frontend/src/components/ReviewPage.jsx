import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; // Make sure the path is correct

export default function ReviewPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/jobs/${jobId}/review`).then((res) => setJob(res.data));
  }, [jobId]);

  const proceedToPayment = () => {
    navigate(`/payments/${jobId}`);
  };

  if (!job)
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-gray-300 text-lg animate-pulse">
            Loading job preview...
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-[#18181b] border border-gray-800 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {job.title}
            </h2>
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
              Review
            </span>
          </div>
          <p className="text-gray-300 text-lg">{job.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[120px]">
              <div className="text-xs uppercase text-gray-400 mb-1">Skills</div>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-800 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-[120px]">
              <div className="text-xs uppercase text-gray-400 mb-1">Tags</div>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-900 text-purple-400 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-700 pt-6">
            <div>
              <div className="text-xs uppercase text-gray-400">Salary</div>
              <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  className="inline-block"
                >
                  <circle cx="10" cy="10" r="10" fill="#10B981" />
                  <text
                    x="10"
                    y="15"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#fff"
                  >
                    ₹
                  </text>
                </svg>
                {job.budget}
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={proceedToPayment}
            >
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
