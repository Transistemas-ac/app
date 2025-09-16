import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../util/constants";
import "../styles/auth.scss";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Registration error:", data.error);
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
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="login">
      <h1>Bienvenidx</h1>
      <form>
        <input
          name="username"
          value={username}
          type="text"
          placeholder="Nombre de usuario"
          onChange={onInputChange}
        />
        <input
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={onInputChange}
        />
        <input
          name="password"
          value={password}
          type="password"
          placeholder="Contraseña"
          onChange={onInputChange}
        />
        <input
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          placeholder="Confirmar contraseña"
          onChange={onInputChange}
        />
        <button type="submit" onClick={handleRegister}>
          Registrarse
        </button>
        <Link className="link" to="/login">
          Iniciar sesión
        </Link>
      </form>
    </div>
  );
};

export default Register;
