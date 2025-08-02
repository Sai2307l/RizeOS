import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../api/jobs";
import Navbar from "./Navbar"; 

export default function CreateJobPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
    tags: "",
    location: "", 
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const jobData = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    const res = await createJob(jobData);
    navigate(`/review/${res.data._id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="max-w-2xl mx-auto p-8 space-y-6 mt-12 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Create a New Job
        </h1>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 text-gray-900 bg-gray-50 transition placeholder-gray-400"
              placeholder="e.g. Build a React Dashboard"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 text-gray-900 bg-gray-50 transition placeholder-gray-400 resize-none"
              placeholder="Describe the job in detail..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={5}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Skills{" "}
              <span className="text-gray-400 font-normal">
                (comma-separated)
              </span>
            </label>
            <input
              className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 text-gray-900 bg-gray-50 transition placeholder-gray-400"
              placeholder="e.g. React, Node.js, TailwindCSS"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Tags{" "}
              <span className="text-gray-400 font-normal">
                (comma-separated)
              </span>
            </label>
            <input
              className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 text-gray-900 bg-gray-50 transition placeholder-gray-400"
              placeholder="e.g. frontend, freelance"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Location
            </label>
            <input
              className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 text-gray-900 bg-gray-50 transition placeholder-gray-400"
              placeholder="e.g. Remote, Bangalore, New York"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Salary <span className="text-gray-400 font-normal">(₹)</span>
            </label>
            <input
              className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-3 text-gray-900 bg-gray-50 transition placeholder-gray-400"
              type="number"
              min="0"
              step="10000"
              placeholder="e.g. 1000000"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              required
            />
          </div>
          <button
            className="w-full py-3 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="submit"
          >
            Proceed to Review
          </button>
        </form>
      </div>
    </div>
  );
}
