"use client";

import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setUser(token);
  }, []);

  return (
    <nav className="bg-[#191919] flex justify-between items-center px-12 py-6 h-16">
      <div>
        <img src="/nike-logo.svg" alt="Logo" className="w-8 h-8" />
      </div>

      <div className="flex items-center gap-6">
        {!user ? (
          <a
            href="/register"
            className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Login
          </a>
        ) : (
          <div className="flex items-center gap-4">
            <a href="/">
              <img
                src="/user-logo.svg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </a>
            <a
              href="/logout"
              className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Log Out
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
