import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setLocations,
  setUserLocation,
  setMapCenter,
} from "../../redux/useReducer";
import axios from "axios";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocationInput = () => {
  const userLocation = useSelector((state) => state.sports.userLocation);
  const token = useSelector((state) => state.sports.token);

  const dispatch = useDispatch();

  // --------- Center point of map -------------------
  function findCenter(locations) {
    let totalLat = 0;
    let totalLng = 0;

    // Calculate the sum of latitude and longitude values
    for (const location of locations) {
      totalLat += location.lat;
      totalLng += location.lng;
    }

    // Calculate the average latitude and longitude
    const avgLat = totalLat / locations.length;
    const avgLng = totalLng / locations.length;

    return { lat: avgLat, lng: avgLng };
  }

  // --------- Center point of map end-------------------

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        componentRestrictions: { country: "IN" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
      currentUser: true,
    };
    console.log(latLng);
    axios
      .post("http://localhost:8000/search", {
        jwtoken: token,
        latitude: latLng.lat,
        longitude: latLng.lng,
        distance: 10000,
      })
      .then((response) => {
        // dispatch(setLocations([latLng]));
        console.log(response);
        if (response.data.users.length != 0) {
          let locations = response.data.users.map((item) => {
            const coordinates = item.location.coordinates;
            return {
              lat: coordinates[1], // Latitude
              lng: coordinates[0], // Longitude
              currentUser: false, // Assuming currentUser is always false in this case
            };
          });
          console.log(locations);
          let center = findCenter(locations);
          dispatch(setMapCenter(center));
          dispatch(setLocations([...locations, userLocation]));
          // dispatch(setLocations());
        } else {
          dispatch(setMapCenter(userLocation));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      if (navigator.geolocation.permission === "granted") {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          dispatch(setLocations([{ lat, lng, currentUser: true }]));
          dispatch(setUserLocation({ lat, lng, currentUser: true }));
          axios
            .post("http://localhost:8000/currentuserlocation", {
              jwtoken: token,
              latitude: lat,
              longitude: lng,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.error("Error getting user location:", error);
        }
      } else if (navigator.geolocation.permission === "denied") {
        console.warn("Location permission denied.");
      } else {
        // Request permission if not granted or undetermined
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            dispatch(setUserLocation({ lat, lng, currentUser: true }));
            dispatch(setLocations([{ lat, lng, currentUser: true }]));
            axios
              .post("http://localhost:8000/currentuserlocation", {
                jwtoken: token,
                latitude: lat,
                longitude: lng,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.error(error);
              });
          },
          (error) => console.error("Error getting user location:", error)
        );
      }
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
    getUserLocation();
  }, []);

  return (
    <div className="search-location-input">
      <div className="hero">
        <label>Enter Place name which you like</label>
        <input
          ref={autoCompleteRef}
          className="form-control"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search place ..."
          value={query}
        />
        <button>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchLocationInput;
