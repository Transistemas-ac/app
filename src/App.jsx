import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Course from "./views/Course";
import User from "./views/User";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  useAuth(user, setUser, setAuthLoading);

  return (
    <main className="routes-main">
      <Navbar setUser={setUser} />
      {authLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={
              user?.loggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/home"
            element={
              user?.loggedIn ? (
                <Home user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              user?.loggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user?.loggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Register setUser={setUser} />
              )
            }
          />
          <Route
            path="/course/:courseId"
            element={
              user?.loggedIn ? <Course user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/user/:userId"
            element={
              user?.loggedIn ? <User user={user} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      )}
      <Footer />
    </main>
  );
}

export default App;
