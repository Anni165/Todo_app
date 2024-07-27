import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-purple-600 text-white py-2">
      <div className="logo"><span className="font-bold text-xl mx-8">Task-Pro</span></div>
      <ul className="flex gap-4 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all duration-300">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all duration-300">My Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
