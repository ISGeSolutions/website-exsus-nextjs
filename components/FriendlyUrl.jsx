// import * as React from 'react';
import { Html, style } from "@react-email/html";
import { Button } from "@react-email/button";
import React, { useState, useEffect } from "react";
import { NavLink } from "components";

export function FriendlyUrl(props) {
  const friendlyUrlArr = props?.data?.split("/");

  let regionWiseUrl = "/uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      // setMyVariable(window.site_region);
    }
  }

  const dynamicFriendlyLink = (element, index) => {
    const link = element.trim().replace(/\s+/g, "-").toLowerCase();
    if (index == 0) {
      return `/`;
    } else if (index == 1) {
      return regionWiseUrl + `/` + link;
    } else if (index == 2) {
      // return regionWiseUrl + `/continent?destinationcode=` + ;
    } else {
      // return regionWiseUrl + `/continent?destinationcode=` + id;
    }
  };

  useEffect(() => {
    // Update the current date every second
  }, []);

  return (
    <>
      <ul>
        {friendlyUrlArr?.map((friendlyUrl, i) => (
          <li key={i}>
            <NavLink href={dynamicFriendlyLink(friendlyUrl, i)}>
              {friendlyUrl}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
