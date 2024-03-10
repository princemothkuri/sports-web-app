import React, { useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const isLogin = useSelector((state) => state.sports.login);

  return (
    <header className="header">
      <nav className="nav-links">
        {isLogin ? (
          <>
            <h1>PlayTogether</h1>
            <div className="links">
              <p>
                <a href="/">Home</a>
              </p>
              <p>
                <a href="/profile">Profile</a>
              </p>
              <p>
                <a href="/search">Search</a>
              </p>
              <p className="logout">
                <a href="/logout">Logout</a>
              </p>
            </div>
          </>
        ) : (
          <>
            <h1>PlayTogether</h1>
            <div className="links">
              <p>
                <a href="/login">Login</a>
              </p>
              <p>
                <a href="/registration">SignUp</a>
              </p>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
