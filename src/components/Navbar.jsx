import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Power from "../assets/power.svg?react";
import User from "../assets/user.svg?react";
import "../styles/navbar.scss";

function Navbar({ setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(undefined);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <a href={"/"}>
          <img src={Logo} alt="Logo" className="svg logo" />
        </a>
      </div>
      <div className="right">
        <button onClick={handleLogout}>
          <Power alt="Logout" className="svg power" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
