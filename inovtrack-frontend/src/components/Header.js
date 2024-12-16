import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for redirection
import './Header.css';

function Header() {
  const navigate = useNavigate(); // hook for redirection

  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="header-controls">
        <input type="text" placeholder="Search" />
        <button className="filter-btn">Quick Filters</button>
        {/* Profile circle icon */}
        <div 
          className="profile-circle" 
          onClick={handleProfileClick}
        >
          {/* You can add a dynamic image here for the user's profile picture */}
          <img 
            src="https://via.placeholder.com/40" 
            alt="User Profile" 
            className="profile-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
