// import * as React from 'react';
import { Html, style } from "@react-email/html";
import { Button } from "@react-email/button";
import React, { useState, useEffect } from "react";
import { NavLink } from "components";

export function FriendlyUrl(props) {

  const friendlyUrlArr = props?.data?.split("/");
  console.log(friendlyUrlArr);
  let routeUrl = "";
  let regionWiseUrl = "/uk";
  if (typeof window !== "undefined") {
    if (window && window.site_region) {
      regionWiseUrl = "/" + window.site_region;
      // setMyVariable(window.site_region);
    }
  }

  const dynamicFriendlyLink = (element, index) => {
    const link = element.trim().replace(/\s+/g, "-").replace(/ /g, "-").toLowerCase();
    if (index == 0) {
      return `/`;
    } else if (index == 1) {
      routeUrl = regionWiseUrl + `/` + link;
      return regionWiseUrl + `/` + link;
    } else if (index == 2) {
      routeUrl = routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
      return routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
    } else if (index == 3) {
      routeUrl = routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
      return routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
    } else if (index == 4) {
      routeUrl = routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
      return routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
    } else if (index == 5) {
      routeUrl = routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
      return routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
    } else if (index == 6) {
      routeUrl = routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
      return routeUrl.endsWith(`/${link}`) ? routeUrl : `${routeUrl}/${link}`;
    }
  };

  useEffect(() => {
    // Update the current date every second
  }, [friendlyUrlArr]);

  return (
    <>
      <ul>
        {friendlyUrlArr?.map((friendlyUrl, i) => (
          <li key={i}>
            {i === friendlyUrlArr.length - 1 ? (
              <span>{friendlyUrl?.replace(/-/g, " ").trim().replace(/\b\w/g, char => char.toUpperCase())}</span>
            ) : (
              <NavLink href={dynamicFriendlyLink(friendlyUrl, i)}>
                {friendlyUrl?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase())}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
