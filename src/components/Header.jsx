import React from 'react';
import NavBar from './NavBar';
import SearchSection from './SearchSection';

const Header = () => {
  return (
    <header className="bg-[#0e0e10] text-white py-4 shadow-md p-4">
        <NavBar />
        <SearchSection />
    </header>
  );
};

export default Header;
