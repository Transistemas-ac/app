import React from "react";
import Logo from "../assets/logo.svg";
import Cat from "../assets/cat.svg";
import Menu from "../assets/menu.svg";
import "../styles/Navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <img src={Logo} alt="Logo" className="svg logo" />
      <img src={Cat} alt="Cat" className="svg cat" />
      <img src={Menu} alt="Menu" className="svg menu" />
    </div>
  );
}

export default Navbar;
