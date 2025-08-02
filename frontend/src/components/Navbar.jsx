import React, { useState } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import auth from "../hooks/useAuth";
const menuOptions = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "Jobs", href: "/jobs" },
  { name: "Create Job", href: "/create-job" },
  { name: "Resume Uploader", href: "/resume" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = auth();
  return (
    <nav className="bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-cyan-400 tracking-wide">
              RizeOS
            </span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuOptions.map((option) => (
              <a
                key={option.name}
                href={option.href}
                className="text-gray-100 hover:text-cyan-400 transition-colors duration-200 font-medium px-3 py-2 rounded-md"
              >
                {option.name}
              </a>
            ))}
            <button
              onClick={() => {
                logout();
                window.location.reload();
              }}
              className="flex items-center gap-2 bg-cyan-400 text-gray-900 hover:bg-cyan-300 transition-colors duration-200 font-semibold px-4 py-2 rounded-md shadow"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-cyan-400 hover:text-cyan-300 focus:outline-none"
            >
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {menuOptions.map((option) => (
              <a
                key={option.name}
                href={option.href}
                className="block text-gray-100 hover:text-cyan-400 transition-colors duration-200 font-medium px-3 py-2 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                {option.name}
              </a>
            ))}
            <button
              onClick={() => {
                logout();
                window.location.reload();
              }}
              className="w-full flex items-center justify-center gap-2 bg-cyan-400 text-gray-900 hover:bg-cyan-300 transition-colors duration-200 font-semibold px-4 py-2 rounded-md shadow"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
