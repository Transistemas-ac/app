import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./views/Home/Home";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import DEFAULT_USER from "./util/constants";
import "./App.css";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : DEFAULT_USER;
  });

  useAuth(user, setUser, setAuthLoading);

  return (
    <main className="routes-main">
      {authLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              user.loggedIn ? (
                <Navigate to="/home" element={<Home />} />
              ) : (
                <Navigate to="/login" element={<Login />} />
              )
            }
          />
          <Route
            path="/login"
            element={
              user.loggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route parh="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/home"
            element={
              user.loggedIn ? (
                <Home user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
