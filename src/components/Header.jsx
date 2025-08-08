import React from 'react';
import NavBar from './NavBar';
import SearchSection from './SearchSection';

const Header = () => {
  return (
    <header className="text-white sm:py-4 shadow-md p-1 sm:p-4">
        <NavBar />
        <SearchSection />
    </header>
  );
};

export default Header;
