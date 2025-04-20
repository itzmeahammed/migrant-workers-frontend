// AIzaSyCwP2bBdZspPqvMafyvB6SIxsCUV-z3BZA
import React, { useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];
const apiKey = "AIzaSyCjTxutp-rZ7Ojz3Txp1xdVxXgIghrw07k"; // Temporary test key

const NearbyPGMap = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const onLoad = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 14,
    });

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search PGs or Hostels";
    input.style.cssText = "margin:10px; padding:8px; width:300px;";

    const card = document.createElement("div");
    card.appendChild(input);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(card);

    const pac = new window.google.maps.places.PlaceAutocompleteElement({
      inputElement: input,
    });

    pac.addEventListener("gmp-placeselect", async (e) => {
      const place = e.place;
      await place.fetchFields({ fields: ["location", "displayName"] });

      if (place.location) {
        new window.google.maps.Marker({
          position: place.location,
          map: map,
        });
        map.setCenter(place.location);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
      version='beta'
      onLoad={onLoad}
    >
      <div id='map' style={{ height: "100vh", width: "100%" }} />
    </LoadScript>
  );
};

export default NearbyPGMap;
