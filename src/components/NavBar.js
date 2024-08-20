import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Eternal Quill</div>
        <div className="flex space-x-4">
          <Link to="/profile" className="text-white hover:text-gray-400">
            Profile
          </Link>
          <Link to="/competitions" className="text-white hover:text-gray-400">
            Competitions
          </Link>
          <Link to="/feed" className="text-white hover:text-gray-400">
            Feed
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
