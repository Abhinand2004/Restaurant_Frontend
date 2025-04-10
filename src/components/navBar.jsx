import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./images/logo3.png";
import "./css/navBar.css";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="navBarBody">
      <div className="navBarSectionBody">
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
          <div className="center-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="navLogo">
            <img src={Logo} alt="Logo" className="mainlogo" />
            <div className="logo-text">
              <div className="logo-top">
                <span className="deep">DEEP </span>
                <span className="net">NET</span>
              </div>
              <span className="soft">SOFT</span>
            </div>
          </div>

          <ul
            className={isMobile ? "nav-links-mobile" : "nav-links"}
            onClick={() => setIsMobile(false)}
          >
            <li>
              <Link to="/" onClick={() => setIsMobile(false)}>HOME</Link>
            </li>
            <li>
              <Link to="/" onClick={() => setIsMobile(false)}>MENU</Link>
            </li>
            <li>
              <Link to="/" onClick={() => setIsMobile(false)}>MAKE A RESERVATION</Link>
            </li>
            <li>
              <Link to="/" onClick={() => setIsMobile(false)}>CONTACT US</Link>
            </li>
            <li>
              <Link to="/admin" onClick={() => setIsMobile(false)}>ADMIN</Link>
            </li>
          </ul>

          <button
            className="mobile-menu-icon"
            aria-label={isMobile ? "Close menu" : "Open menu"}
            onClick={() => setIsMobile(!isMobile)}
          >
            {isMobile ? <>&#10005;</> : <>&#9776;</>}
          </button>
        </nav>
      </div>
    </div>
  );
}