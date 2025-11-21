import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A1A2F] text-gray-300 py-6 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 text-xs uppercase tracking-wide">
          <span className="cursor-pointer transition hover:text-white">Privacy</span>
          <span className="cursor-pointer transition hover:text-white">Terms</span>
          <span className="cursor-pointer transition hover:text-white">Support</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
