import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../util/constants";
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

      if (!response.ok) {
        console.error("Login error:", data.error);
        return;
      }

      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        credentials: data.credentials,
        pronouns: data.pronouns,
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        photo_url: data.photo_url,
        link: data.link,
        team: data.team,
        subscriptions: data.subscriptions,
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
      <h1>Bienvenidx</h1>
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
