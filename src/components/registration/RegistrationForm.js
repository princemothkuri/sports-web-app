import React, { useState } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    sportsInterests: [],
    skillLevel: "",
    preferredActivities: [],
    latitude: "",
    longitude: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("https://sports-web-app-server.onrender.com/register", formData)
      .then((response) => {
        alert("SignUp successful!");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        alert("Try after some time ...");
      });
    setFormData({
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      sportsInterests: [],
      skillLevel: "",
      preferredActivities: [],
      latitude: "",
      longitude: "",
    });
  };

  // Get user's current location using Google Maps API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevData) => ({
          ...prevData,
          latitude: latitude,
          longitude: longitude,
        }));
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  return (
    <div className="registration-form">
      <div className="hero">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h1>SignUp</h1>
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              placeholder="Contact Number"
              required
            />
          </div>
          <div className="form-group">
            <label>Sports Interests (comma-separated)</label>
            <input
              type="text"
              name="sportsInterests"
              value={formData.sportsInterests.join(", ")}
              onChange={handleInputChange}
              placeholder="Sports Interests (comma-separated)"
              required
            />
          </div>
          <div className="form-group">
            <label>Skill Level</label>
            <div>
              <label className="ratio-btn">
                <input
                  type="radio"
                  name="skillLevel"
                  value="beginner"
                  checked={formData.skillLevel === "beginner"}
                  onChange={(e) =>
                    setFormData({ ...formData, skillLevel: e.target.value })
                  }
                  required
                />{" "}
                Beginner
              </label>
              <label className="ratio-btn">
                <input
                  type="radio"
                  name="skillLevel"
                  value="intermediate"
                  checked={formData.skillLevel === "intermediate"}
                  onChange={(e) =>
                    setFormData({ ...formData, skillLevel: e.target.value })
                  }
                  required
                />{" "}
                Intermediate
              </label>
              <label className="ratio-btn">
                <input
                  type="radio"
                  name="skillLevel"
                  value="advanced"
                  checked={formData.skillLevel === "advanced"}
                  onChange={(e) =>
                    setFormData({ ...formData, skillLevel: e.target.value })
                  }
                  required
                />{" "}
                Advanced
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Preferred Activities (comma-separated)</label>
            <input
              type="text"
              name="preferredActivities"
              value={formData.preferredActivities.join(", ")}
              onChange={handleInputChange}
              placeholder="Preferred Activities (comma-separated)"
              required
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={getCurrentLocation}>
              Get Current Location
            </button>
            <p>
              Latitude: <span>{formData.latitude}</span>
            </p>
            <p>
              Longitude: <span>{formData.longitude}</span>
            </p>
          </div>
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
