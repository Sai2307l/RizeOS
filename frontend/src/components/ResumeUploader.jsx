// components/ResumeUploader.jsx
import { useState } from "react";
import axios from "axios";
import { updateProfile } from "../api/auth";
import Navbar from "./Navbar"; // Assuming Navbar is in components folder

function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedSkills, setEditedSkills] = useState([]);
  const [updating, setUpdating] = useState(false);
  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    try {
      const res = await axios.post("/api/ai", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data.skills || []);
      setEditedSkills(res.data.skills || []);
      setEditMode(false);
    } catch (err) {
      console.error("Upload failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillChange = (idx, value) => {
    const updated = [...editedSkills];
    updated[idx] = value;
    setEditedSkills(updated);
  };

  const handleRemoveSkill = (idx) => {
    const updated = editedSkills.filter((_, i) => i !== idx);
    setEditedSkills(updated);
  };

  const handleAddSkill = () => {
    setEditedSkills([...editedSkills, ""]);
  };

  const handleSaveSkills = () => {
    setSkills(editedSkills.filter((s) => s.trim() !== ""));
    setEditMode(false);
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      await updateProfile({ skills: editedSkills });
      alert("Profile updated with skills!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                fill="#6366f1"
                d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828a2 2 0 0 0-.586-1.414l-4.828-4.828A2 2 0 0 0 13.172 2H6zm7 1.414L19.586 10H15a2 2 0 0 1-2-2V3.414z"
              />
            </svg>
            Resume Skill Extractor
          </h2>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 border border-gray-700 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition font-semibold ${
                loading || !file ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#fff"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="#fff"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Upload Resume"
              )}
            </button>
          </div>

          {skills.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                  🧠 Extracted Skills
                </h3>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-indigo-400 hover:underline text-sm font-medium"
                  >
                    Edit Skills
                  </button>
                )}
              </div>
              {!editMode ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-indigo-900 text-indigo-200 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {editedSkills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(idx, e.target.value)}
                          className="border border-gray-700 bg-gray-800 text-gray-200 px-2 py-1 rounded text-sm focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => handleRemoveSkill(idx)}
                          className="text-red-400 hover:text-red-600 text-xs px-1"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSkill}
                      className="bg-gray-800 text-indigo-400 px-2 py-1 rounded text-sm font-medium hover:bg-gray-700"
                    >
                      + Add Skill
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveSkills}
                      className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedSkills(skills);
                      }}
                      className="bg-gray-800 text-gray-300 px-4 py-1 rounded hover:bg-gray-700 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {/* New: Update Profile Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  className={`bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition font-semibold ${
                    updating ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {updating ? "Updating..." : "Update Profile with Skills"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeUploader;
