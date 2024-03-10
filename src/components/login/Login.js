import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userLogin, setToken } from "../../redux/useReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("https://sports-web-app-server.onrender.com/login", formData)
      .then((response) => {
        dispatch(userLogin({ login: true }));
        dispatch(setToken({ token: response.data.token }));
        alert("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Try after some time ...");
      });
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth-form">
      <div className="hero">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
