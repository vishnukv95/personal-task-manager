import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-700 text-white mt-10 shadow-inner fixed bottom-0">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        
        <div className="text-lg font-semibold">
          © {new Date().getFullYear()} Task Manager
        </div>

       
        <nav className="flex gap-6 font-medium">
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
        </nav>

       
        
      </div>
    </footer>
  );
};

export default Footer;
