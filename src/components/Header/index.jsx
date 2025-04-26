import React from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <h1>Candidate Management System</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
