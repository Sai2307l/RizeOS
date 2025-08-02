import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../api/auth";
import Navbar from "./Navbar"; // Make sure the path is correct

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    linkedIn: "",
    skills: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        bio: user.bio || "",
        linkedIn: user.linkedIn || "",
        skills: Array.isArray(user.skills)
          ? user.skills.join(", ")
          : user.skills || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      // Convert comma-separated skills string to array before sending
      await updateProfile({
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      setMessage("Profile updated");
    } catch {
      setMessage("Update failed");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500"></div>
      </div>
    );
  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-white text-xl">Please log in.</p>
      </div>
    );

  // Prepare skills for display
  const skillsList = form.skills
    ? form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800 mt-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-4xl text-white font-bold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <span className="absolute bottom-0 right-0 bg-green-500 border-4 border-gray-900 rounded-full w-5 h-5"></span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {user.name}
              </h2>
              <p className="text-pink-400 text-sm">{user.email}</p>
              <a
                href={form.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-blue-400 hover:text-blue-300 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Bio</h3>
              <p className="text-gray-300">{form.bio || "No bio provided."}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Account Info
              </h3>
              <ul className="text-gray-300 space-y-1">
                <li>
                  <span className="font-medium text-gray-400">Email:</span>{" "}
                  {user.email}
                </li>
                <li>
                  <span className="font-medium text-gray-400">Joined:</span>{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </li>
                <li>
                  <span className="font-medium text-gray-400">Status:</span>{" "}
                  <span className="text-green-400">Active</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-800 rounded-xl p-5 shadow-lg mb-8">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Skills
            </h3>
            {skillsList.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {skillsList.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No skills added.</p>
            )}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
            {message && (
              <div
                className={`mb-4 px-4 py-2 rounded text-center font-medium ${
                  message === "Profile updated"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-400 mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1" htmlFor="linkedIn">
                  LinkedIn URL
                </label>
                <input
                  id="linkedIn"
                  name="linkedIn"
                  placeholder="LinkedIn URL"
                  value={form.linkedIn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1" htmlFor="skills">
                  Skills (comma separated)
                </label>
                <input
                  id="skills"
                  name="skills"
                  placeholder="e.g. React, Node.js, CSS"
                  value={form.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none transition"
                />
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 font-semibold px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
