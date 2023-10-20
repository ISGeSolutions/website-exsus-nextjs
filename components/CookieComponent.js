// CookieComponent.js
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function CookieComponent() {
  const [cookieAccepted, setCookieAccepted] = useState();
  const [isDisplay, setIsDisplay] = useState();

  const handleAccept = () => {
    Cookies.set("cookieAccepted", "true");
    setCookieAccepted("true");
    setIsDisplay(true);
  };

  const handleClose = () => {
    setIsDisplay(false);
  };

  useEffect(() => {
    setIsDisplay(true);
    setCookieAccepted(Cookies.get("cookieAccepted"));
  }, []);

  return (
    <div>
      {cookieAccepted === "true" ? null : (
        <div>
          <div
            className="cookies_parnt_blk"
            style={{ display: isDisplay ? "block" : "none" }}
          >
            <h6>
              <em className="material-symbols-outlined">cookie</em>Cookie policy
              <button className="btn cookies_close_btn">
                <em className="material-symbols-outlined" onClick={handleClose}>
                  close
                </em>
              </button>
            </h6>
            <p>
              Exsus uses cookies to give you the best experience on our website.
              By continuing, we assume you're OK with this.
            </p>
            <button className="btn prmry_btn" onClick={handleAccept}>
              Accept & continue
              <svg
                xmlns="http:www.w3.org/2000/svg"
                fill="#ffffff"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 267 512.43"
              >
                <path
                  fillRule="nonzero"
                  d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CookieComponent;
