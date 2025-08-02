import { useState, useEffect } from "react";
import { fetchJobs } from "../api/jobs";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  // For dropdown options
  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await fetchJobs();
        setJobs(data);

        // Extract unique locations and skills for filter dropdowns
        const locSet = new Set();
        const skillSet = new Set();
        data.forEach((job) => {
          if (job.location) locSet.add(job.location);
          if (Array.isArray(job.skills)) {
            job.skills.forEach((s) => skillSet.add(s));
          }
        });
        setLocations([...locSet]);
        setSkills([...skillSet]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filtering logic
  const filteredJobs = jobs.filter((job) => {
    const matchesLocation = !locationFilter || job.location === locationFilter;
    const matchesSkill =
      !skillFilter ||
      (Array.isArray(job.skills) && job.skills.includes(skillFilter));
    return matchesLocation && matchesSkill;
  });

  if (loading)
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-gray-300 text-xl font-medium animate-pulse tracking-wide">
            Loading jobs...
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-lg">
            Explore Opportunities
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none"
            >
              <option value="">All Skills</option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            {(locationFilter || skillFilter) && (
              <button
                onClick={() => {
                  setLocationFilter("");
                  setSkillFilter("");
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="space-y-8">
            {filteredJobs.map((job) => (
              <Link
                to={`/jobs/${job._id}`}
                key={job._id}
                className="block group rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-gray-800 hover:border-indigo-500"
              >
                <div className="p-8 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 tracking-tight">
                      {job.title}
                    </h3>
                    <p className="mt-3 text-gray-300 text-base md:text-lg line-clamp-2">
                      {job.description || "No description provided."}
                    </p>
                    {Array.isArray(job.skills) && job.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-indigo-700/30 text-indigo-300 px-2 py-1 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end md:items-center md:ml-8 flex-shrink-0">
                    <span className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow group-hover:bg-indigo-700 transition-colors duration-200">
                      ₹{job.budget}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-800 px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-400 bg-gray-900/60 rounded-b-2xl">
                  <span>
                    <span className="font-medium text-gray-300">Posted:</span>{" "}
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                  <span className="mt-2 md:mt-0">
                    <span className="font-medium text-gray-300">Category:</span>{" "}
                    {job.category ? job.category : "General"}
                  </span>
                  {job.location && (
                    <span className="mt-2 md:mt-0">
                      <span className="font-medium text-gray-300">
                        Location:
                      </span>{" "}
                      {job.location}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {filteredJobs.length === 0 && (
            <div className="text-center text-gray-400 mt-20 text-xl font-medium">
              No jobs found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
