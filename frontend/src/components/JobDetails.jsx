import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchJob, applyToJob } from "../api/jobs";
import { FaBriefcase, FaTools } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import Navbar from "./Navbar"; // Import your Navbar component

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await applyToJob(id);
      setMessage("Application submitted");
    } catch {
      setMessage("Application failed");
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const { data } = await fetchJob(id);
        setJob(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!job)
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950">
        <Navbar /> {/* Navbar at the top */}
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-50"></div>
          <p className="ml-6 text-gray-300 text-xl font-semibold tracking-wide">
            Loading job details...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex flex-col">
      <Navbar /> {/* Navbar at the top */}
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-800 p-10 relative overflow-hidden">
          {/* Decorative blurred background */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-indigo-700 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-pink-600 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header */}
          <div>{message}</div>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-700 p-4 rounded-xl shadow-lg">
              <FaBriefcase className="text-4xl text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                {job.title}
              </h2>
              <p className="text-gray-400 text-lg mt-1 font-medium">
                Job ID: <span className="text-indigo-400">{id}</span>
              </p>
              <p className="text-gray-400 text-base mt-1 font-medium">
                Location: <span className="text-green-400">{job.location}</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <MdDescription className="text-2xl text-pink-400 mr-2" />
              <span className="text-gray-300 font-semibold text-lg">
                Description
              </span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed bg-gray-900/60 rounded-xl p-4 border border-gray-800 shadow-inner">
              {job.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-10">
            <div className="flex items-center mb-2">
              <FaTools className="text-xl text-green-400 mr-2" />
              <span className="text-gray-300 font-semibold text-lg">
                Skills Required
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-gray-800 hover:scale-105 transition-transform"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
