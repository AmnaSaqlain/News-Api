import React from "react";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`header ${isDarkMode ? "dark" : "light"}`}>
     
      <div className="logo">
        <img src="/images/newslogo.jpg" alt="News Logo" />
       
      </div>

      
      <button className="mode-btn" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
