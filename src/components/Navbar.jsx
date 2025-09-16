import { API_URL } from "../util/constants";
import Logo from "../assets/logo.svg";
import Cat from "../assets/cat.svg";
import Power from "../assets/power.svg";
import User from "../assets/user.svg";
import "../styles/navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <a href="/">
          <img src={Logo} alt="Logo" className="svg logo" />
        </a>
      </div>
      <div className="center" />
      <a href={API_URL}>
        <img src={Cat} alt="Cat" className="svg cat" />
      </a>
      <div className="right">
        <a href="/logout">
          <img src={Power} alt="Power" className="svg power" />
        </a>
        <a href={`/user/${localStorage.getItem("user_id")}`} />
        <img src={User} alt="User" className="svg user" />
      </div>
    </div>
  );
}

export default Navbar;
