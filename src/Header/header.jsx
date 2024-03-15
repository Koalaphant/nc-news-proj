import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Contexts/User";
import "./header.css";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className="navbar">
        <h1 id="site-logo">
          <Link to="/" onClick={closeMenu}>
            <span id="logo-nc">NC</span> News
          </Link>
        </h1>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/topics" onClick={closeMenu}>
              Topics
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/articles" onClick={closeMenu}>
              Articles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users" onClick={closeMenu}>
              Users
            </Link>
          </li>
          <li className="nav-item logged-in">Logged in: {loggedInUser.username}</li>
        </ul>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
