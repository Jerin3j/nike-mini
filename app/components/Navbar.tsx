"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setUser(token);
  }, []);

  // If on /register page, hide auth section
  const hideAuthSection = pathname === "/register";

  return (
    <nav className="bg-[#191919] flex justify-between items-center px-12 py-6 h-16">
      <div>
        <img src="/nike-logo.svg" alt="Logo" className="w-8 h-8" />
      </div>

      {!hideAuthSection && (
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
              <a href="/my-orders">
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
      )}
    </nav>
  );
};

export default Navbar;
