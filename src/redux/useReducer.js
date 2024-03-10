import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  locations: [],
  mapCenter: null,
  userLocation: null,
  token: null,
};

export const sportSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.login = action.payload.login;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const {
  userLogin,
  setLocations,
  setUserLocation,
  setMapCenter,
  setToken,
} = sportSlice.actions;

export default sportSlice.reducer;
