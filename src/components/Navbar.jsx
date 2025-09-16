import { useNavigate } from "react-router-dom";
import { LANDING_URL } from "../util/constants";
import Logo from "../assets/logo.svg";
import Cat from "../assets/cat.svg";
import Power from "../assets/power.svg";
import User from "../assets/user.svg";
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
        <a href={LANDING_URL}>
          <img src={Logo} alt="Logo" className="svg logo" />
        </a>
      </div>
      <div className="center" />
      <a href="/">
        <img src={Cat} alt="Cat" className="svg cat" />
      </a>
      <div className="right">
        <button onClick={handleLogout}>
          <img src={Power} alt="Power" className="svg power" />
        </button>
        {localStorage.getItem("user") && (
          <a href={`/user/${JSON.parse(localStorage.getItem("user")).id}`}>
            <img src={User} alt="User" className="svg user" />
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
