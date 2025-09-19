import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../util/constants";
import Cat from "../assets/cat.png";
import "../styles/auth.scss";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onInputChange = (e) => {
    if (e.target.type === "text") setUsername(e.target.value);
    if (e.target.type === "password") setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      const {
        id,
        username: dbUsername,
        email,
        credentials,
        pronouns,
        first_name,
        last_name,
        description,
        photo_url,
        link,
        team,
        subscriptions,
      } = data.user;

      if (!response.ok) {
        console.error("Login error:", data.error);
        return;
      }

      const userData = {
        id,
        dbUsername,
        email,
        credentials,
        pronouns,
        first_name,
        last_name,
        description,
        photo_url,
        link,
        team,
        subscriptions,
        loggedIn: true,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <div className="cat-container">
        <img src={Cat} alt="Cat" className="svg cat" />
      </div>
      <h1>Bienvenide</h1>
      <form>
        <input
          value={username}
          type="text"
          placeholder="Nombre de usuario"
          onChange={onInputChange}
        />
        <input
          value={password}
          type="password"
          placeholder="Contraseña"
          onChange={onInputChange}
        />
        <button type="submit" onClick={handleLogin}>
          Iniciar sesión
        </button>
        <Link className="link" to="/register">
          Registrarse
        </Link>
      </form>
    </div>
  );
};

export default Login;
