import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#0e0e10] text-white py-4 shadow-md">
      <div className="mx-auto px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">GameStore</h1>
        <nav className="space-x-6 hidden md:flex gap-6">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Browse</a>
          <a href="#" className="hover:text-gray-300">News</a>
        </nav>
        <div className="flex-1 max-w-md ml-4">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full px-4 py-2 rounded bg-[#1c1c1e] text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
