// import * as React from 'react';
import { Html, style } from "@react-email/html";
import { Button } from "@react-email/button";
import React, { useState, useEffect } from "react";
import { NavLink } from "components";


export function ImageSlider(props) {
    const backgroundImage = props?.data;
    let routeUrl = "";
    let regionWiseUrl = "";

    useEffect(() => {
        // Update the current date every second



        $(".banner_map_tab").click(function () {
            $(".banner_map_blk").addClass("banner_map_active");
        });
        $(".banner_img_tab").click(function () {
            $(".banner_map_blk").removeClass("banner_map_active");
        });

        $(".banner_tab_blk button").click(function () {
            $(".banner_tab_blk button").removeClass("banner_tab_active");
            $(this).addClass("banner_tab_active");
        });
        setTimeout(() => {
            // $('.carousel').carousel();
            $(".carousel").carousel({
                interval: 250 * 10,
            });
        }, 2000);
    }, [backgroundImage]);

    return (
        <>
            {backgroundImage ? (
                <div
                    id="carouselExampleInterval"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators" id="scrollToElement">
                        {backgroundImage.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleInterval"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {backgroundImage.map((imagePath, index) => (
                            <a
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                data-interval="5000"
                            >
                                <div
                                    className="banner_commn_cls"
                                    style={{
                                        backgroundImage: `url(${imagePath})`,
                                    }}
                                ></div>
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}
