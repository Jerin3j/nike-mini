import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black px-6 py-[64px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <img
          src="/nike-logo.svg"
          alt="Nike Logo"
          className="w-16 h-auto"
        />

        <div className="flex items-center gap-6">
          <img
            src="/fb-logo.svg"
            alt="Facebook"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/ig-logo.svg"
            alt="Instagram"
            className="w-4 h-4 cursor-pointer"
          />
          <img
            src="/twitter-logo.svg"
            alt="Twitter"
            className="w-3 h-4 cursor-pointer"
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
