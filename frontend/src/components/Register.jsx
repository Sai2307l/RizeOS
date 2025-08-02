import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    try {
      await register(form);
      setMessage({
        text: "Registration successful! Redirecting to login...",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Registration failed",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-white text-center tracking-wide">
          Create your account
        </h2>
        {message.text && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg text-center font-medium transition-all duration-300 ${
              message.type === "success"
                ? "bg-green-600 text-white border border-green-400 shadow-green-500/30 shadow"
                : "bg-red-600 text-white border border-red-400 shadow-red-500/30 shadow"
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1 ml-1" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 ml-1" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 ml-1" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-pink-600 transition-all duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-400">Already have an account? </span>
          <button
            className="text-blue-400 hover:text-pink-400 font-semibold transition"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
