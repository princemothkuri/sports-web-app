import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
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
    <div className="profile">
      <div className="main">
        <div className="container">
          <form>
            <h1>Profile</h1>
            <div className="input-box">
              <span className="icon"></span>
              <input
                type="text"
                required
                value="Mothkuri Prince"
                name="name"
                disabled
              />
              <label>Name</label>
            </div>
            <div className="input-box">
              <span className="icon"></span>
              <input
                type="email"
                required
                value="princemothkuri@gmail.com"
                disabled
                name="email"
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon"></span>
              <input
                type="text"
                required
                value="Football, Basketball, Tennis"
                disabled
                name="sports"
              />
              <label>Sports interests</label>
            </div>
            <div className="input-box">
              <span className="icon"></span>
              <input
                type="text"
                required
                value="Intermediate"
                disabled
                name="level"
              />
              <label>Skill level</label>
            </div>
            <div className="input-box">
              <span className="icon"></span>
              <input
                type="text"
                required
                value="Playing matches, Training"
                disabled
                name="activities"
              />
              <label>Preferred sports activities</label>
            </div>
            <div className="input-box">
              <span className="icon"></span>
              <input
                type="text"
                required
                value="New York, USA"
                disabled
                name="location"
              />
              <label>Location</label>
            </div>
            <div className="input-box">
              <span className="icon"></span>
              <input
                type="text"
                required
                value="+1234567890"
                disabled
                name="contact"
              />
              <label>Contact information</label>
            </div>
            <div className="btn">
              <input type="button" value="Edit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
