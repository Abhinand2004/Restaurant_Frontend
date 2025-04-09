import React, { useState } from "react";
import Logo from "./images/logo3.png";
import "./css/navBar.css";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="navBarBody">
      <div className="navBarSectionBody">
        <nav className="navbar">
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
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/">MENU</a>
            </li>
            <li>
              <a href="/">MAKE A RESERVATION</a>
            </li>
            <li>
              <a href="/">CONTACT US</a>
            </li>
            <li>
              <a href="/admin">ADMIN</a>
            </li>
          </ul>

          <button
            className="mobile-menu-icon"
            onClick={() => setIsMobile(!isMobile)}
          >
            {isMobile ? <>&#10005;</> : <>&#9776;</>}
          </button>
        </nav>
      </div>
    </div>
  );
}