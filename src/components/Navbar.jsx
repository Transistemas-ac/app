import React from "react";
import Logo from "../assets/logo.svg";
import "../styles/Navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <img src={Logo} alt="Logo" className="logo" />
    </div>
  );
}

export default Navbar;
