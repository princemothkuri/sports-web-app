import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLocations,
  setUserLocation,
  setMapCenter,
  userLogin,
  setToken,
} from "../../redux/useReducer";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocations([]));
    dispatch(setMapCenter(null));
    dispatch(setUserLocation(null));
    dispatch(userLogin({ login: false }));
    dispatch(setToken({ token: null }));
  }, []);

  return <div>Logout</div>;
};

export default Logout;
