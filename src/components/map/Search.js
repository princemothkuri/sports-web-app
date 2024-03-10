import React, { useEffect, useState } from "react";
import "./Search.css";
import SearchLocationInput from "./GooglePlcasesApi";
import MapComponent from "./Map";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
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
    <div className="search">
      <div className="main">
        <SearchLocationInput />
        <MapComponent />
      </div>
    </div>
  );
};

export default Search;
