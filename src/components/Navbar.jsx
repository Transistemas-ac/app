import { useNavigate } from "react-router-dom";
import Power from "../assets/power.svg?react";
import "../styles/navbar.scss";

function Navbar({ setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(undefined);
    navigate("/login");
  };

  // Función para envolver cada letra en un span
  const wrapLetters = (text) => {
    return text.split("").map((char, index) => <span key={index}>{char}</span>);
  };

  return (
    <div className="navbar">
      <div className="left">
        <a href={"/"}>
          <p>{wrapLetters("<Transistemas>")}</p>
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
