// components/MarkerInfoWindowNext.js
import React, { useEffect, useState, useRef } from "react";
import isEmpty from "lodash.isempty";
import GoogleMap from "./GoogleMap";
import { useRouter } from "next/router";
import globalVariables from "./../../config";

const MarkerInfoWindowNext = (props) => {
  const coordinatesData = props.data;
  const [places, setPlaces] = useState(null);
  const router = useRouter();

  const openInfoWindowRef = useRef(null);

  const getInfoWindowString = (place) => {
    return `
        <div style="text-align: center;">
            <img src="${place.image}" alt="${place.name}" style="max-width: 100%; height: 60px;" />
            <p style="cursor: pointer;"><a style="text-decoration: none;color: #8aad56;padding: 0px 0px;line-height: 20px; width: 100%; display: inline-block;" href="${place.url}">${place.name}</a></p>
        </div>
    `;
  };

  useEffect(() => {
    setPlaces(coordinatesData);
  }, [coordinatesData]);

  const handleApiLoaded = (map, maps, places) => {
    const markers = [];

    places.forEach((place) => {
      const marker = new maps.Marker({
        position: {
          lat: place.lat,
          lng: place.lng,
        },
        map,
      });

      const infowindow = new maps.InfoWindow({
        content: getInfoWindowString(place),
      });

      marker.addListener("click", () => {
        // Close the previous info window, if any
        if (openInfoWindowRef.current) {
          openInfoWindowRef.current.close();
        }

        // Open the current info window
        infowindow.open(map, marker);

        // Update the ref to the current info window
        openInfoWindowRef.current = infowindow;
      });

      marker.addListener("mouseover", () => {
        // Close the previous info window, if any
        if (openInfoWindowRef.current) {
          openInfoWindowRef.current.close();
        }

        // Open the current info window
        infowindow.open(map, marker);

        // Update the ref to the current info window
        openInfoWindowRef.current = infowindow;
      });

      markers.push(marker);
    });
  };

  return (
    <>
      {!isEmpty(places) && (
        <GoogleMap
          defaultZoom={0}
          defaultCenter={coordinatesData[0]}
          bootstrapURLKeys={{ key: globalVariables?.GoogleMap_ID }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            handleApiLoaded(map, maps, places)
          }
        />
      )}
    </>
  );
};

export default MarkerInfoWindowNext;
