import React, { useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const libraries = ["places"]; // Optional: Include places library for geolocation

const MapComponent = () => {
  const locations = useSelector((state) => state.sports.locations);
  const mapCenter = useSelector((state) => state.sports.mapCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries, // Include libraries if needed
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={{ height: "500px" }}
        center={mapCenter}
        zoom={13}
        onLoad={onMapLoad}
      >
        {locations.map((location, index) => (
          <MarkerF
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: location.currentUser
                ? "https://static.vecteezy.com/system/resources/previews/016/017/119/original/current-location-logo-world-map-location-logo-sign-map-graphic-free-png.png"
                : "https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-vector-location-icon-free-and-png-png-image_5708678.png", // Replace with your icon
              scaledSize: new window.google.maps.Size(50, 50), // Set icon size
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
