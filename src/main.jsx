import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Navbar />
      <App />
      <Footer />
    </HashRouter>
  </StrictMode>
);
