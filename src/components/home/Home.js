import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const login = useSelector((state) => state.sports.login);

  function checkLogin() {
    if (!login) {
      navigate("/login");
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="welcome-message">
          <h1>Welcome to SportConnect!</h1>
          <p>Find like-minded sports enthusiasts nearby.</p>
        </div>
        <div className="main">
          <div className="features">
            <h2>Key Features</h2>
            <ul>
              <li>User Registration</li>
              <li>Profile Creation</li>
              <li>Location-Based Search</li>
              <li>Team Formation</li>
              <li>Event Discovery</li>
              <li>Community Building</li>
            </ul>
          </div>
          <div className="call-to-action">
            <a href="/search">
              <button className="btn">Get Started</button>
            </a>
          </div>
          <div className="sports-events">
            <h2>Upcoming Sports Events</h2>
            <ul>
              <li>Football Match - March 15th</li>
              <li>Basketball Tournament - March 20th</li>
              <li>Tennis Clinic - March 25th</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
