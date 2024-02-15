import * as React from 'react';
import { useState, useEffect } from 'react';
import { destinationService, homeService } from '../../services/destinations.service';
import { useRouter } from 'next/router';

export { EnquiryButton };

function EnquiryButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    // const [telePhoneNumber, SetTelePhoneNumber] = useState();
    const [pageInfo, SetPageInfo] = useState();
    const router = useRouter();
    const [telePhoneNumber, SetTelePhoneNumber] = useState("${TelephoneNumber}")

    let region = "uk";
    let regionWiseUrl = "";
    if (typeof window !== "undefined") {
        if (window && window.site_region) {
            if (window.site_region !== "uk") {
                regionWiseUrl = "/" + window.site_region;
                region = window.site_region;
            }
        }
    }

    const handleEnquiryClick = () => {
        // router.push(regionWiseUrl + `/make-an-enquiry`); // Navigate to the /enquiry page
        router.push(regionWiseUrl + `/make-an-enquiry?pType=${pageInfo?.pType}&pCode=${pageInfo?.pCode}`); // Navigate to the /enquiry page

    };

    const websiteContentCheck = (pageNo) => {
        homeService
            .getAllWebsiteContent(region, pageNo)
            .then((x) => {
                const response = x?.data;

                // Calculate the expiration time (1 day from the current time)
                const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

                const dynamicObject = {};
                const dynamicObjectUk = {};
                const dynamicObjectUs = {};
                const dynamicObjectAsia = {};
                const dynamicObjectIndia = {};

                response.forEach((element, index) => {
                    // Create an object with the data and expiration time
                    dynamicObject[element?.attributes?.content_word] =
                        element?.attributes?.content_translation_text;
                    dynamicObject["code"] =
                        element?.attributes?.website_country?.data?.attributes?.code;
                    dynamicObject["expiration"] = expirationTime;
                    if (
                        element?.attributes?.website_country?.data?.attributes?.code == "UK"
                    ) {
                        dynamicObjectUk[element?.attributes?.content_word] =
                            element?.attributes?.content_translation_text;
                        dynamicObjectUk["expiration"] = expirationTime;
                        let localStorageUk = JSON.parse(
                            localStorage.getItem("websitecontent_uk")
                        );
                        localStorage.setItem(
                            "websitecontent_uk",
                            JSON.stringify({ ...localStorageUk, ...dynamicObjectUk })
                        );
                    }
                    if (
                        element?.attributes?.website_country?.data?.attributes?.code == "US"
                    ) {
                        dynamicObjectUs[element?.attributes?.content_word] =
                            element?.attributes?.content_translation_text;
                        dynamicObjectUs["expiration"] = expirationTime;
                        let localStorageUS = JSON.parse(
                            localStorage.getItem("websitecontent_us")
                        );
                        localStorage.setItem(
                            "websitecontent_us",
                            JSON.stringify({ ...localStorageUS, ...dynamicObjectUs })
                        );
                    }
                    if (
                        element?.attributes?.website_country?.data?.attributes?.code ==
                        "ASIA"
                    ) {
                        dynamicObjectAsia[element?.attributes?.content_word] =
                            element?.attributes?.content_translation_text;
                        dynamicObjectAsia["expiration"] = expirationTime;
                        let localStorageAsia = JSON.parse(
                            localStorage.getItem("websitecontent_asia")
                        );
                        localStorage.setItem(
                            "websitecontent_asia",
                            JSON.stringify({ ...localStorageAsia, ...dynamicObjectAsia })
                        );
                    }
                    if (
                        element?.attributes?.website_country?.data?.attributes?.code ==
                        "INDIA"
                    ) {
                        dynamicObjectIndia[element?.attributes?.content_word] =
                            element?.attributes?.content_translation_text;
                        dynamicObjectIndia["expiration"] = expirationTime;
                        let localStorageIndia = JSON.parse(
                            localStorage.getItem("websitecontent_india")
                        );
                        localStorage.setItem(
                            "websitecontent_india",
                            JSON.stringify({ ...localStorageIndia, ...dynamicObjectIndia })
                        );
                    }
                });
                if (x?.meta?.pagination?.pageCount > x?.meta?.pagination?.page) {
                    dictionaryPage = x?.meta?.pagination?.page + 1;
                    websiteContentCheck(dictionaryPage);
                }
                setWebsiteContent(x.data);
                setIsLoading(false);
            })
            .catch((error) => {
                // Handle any errors here
                setIsLoading(false);
            });
    };

    const dictioneryFunction = (data) => {
        let modifiedString = data;
        if (modifiedString) {
            const regex = /{[a-zA-Z0-9-]+}/g;
            const matches = [...new Set(modifiedString.match(regex))];

            let storedDataString = "";
            let storedData = "";

            if (region == "uk") {
                storedDataString = localStorage.getItem("websitecontent_uk");
                storedData = JSON.parse(storedDataString);
            } else if (region == "us") {
                storedDataString = localStorage.getItem("websitecontent_us");
                storedData = JSON.parse(storedDataString);
            } else if (region == "asia") {
                storedDataString = localStorage.getItem("websitecontent_asia");
                storedData = JSON.parse(storedDataString);
            } else if (region == "in") {
                storedDataString = localStorage.getItem("websitecontent_india");
                storedData = JSON.parse(storedDataString);
            }
            if (storedData !== null) {
                // You can access it using localStorage.getItem('yourKey')

                if (matches) {
                    let replacement = "";
                    try {
                        matches.forEach((match, index, matches) => {
                            const matchString = match.replace(/{|}/g, "");
                            if (!storedData[matchString]) {
                                throw new Error("Loop break");
                            } else {
                                replacement = storedData[matchString];
                            }
                            const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
                            if (checkStr && replacement) {
                                modifiedString = modifiedString.replace(checkStr, replacement);
                            }
                        });
                        return modifiedString;
                        setIsLoading(false);
                    } catch (error) { }
                }
            }
        }
    };

    useEffect(() => {
        SetPageInfo(JSON.parse(localStorage.getItem("PageInfo")))
        if (
            !localStorage.getItem(
                `websitecontent_${region.replace(/in/g, "INDIA").toLowerCase()}`
            )
        ) {
            websiteContentCheck(dictionaryPage);
        }
    }, []);

    return (
        <>
            <h3>YOUR JOURNEY STARTS HERE</h3>
            <p>
                call us on <span dangerouslySetInnerHTML={{ __html: dictioneryFunction(telePhoneNumber) }} /> to start planning your perfect trip
            </p>
            <button
                className="btn prmry_btn make_enqury_btn"
                onClick={handleEnquiryClick}
            >
                Make an enquiry
                <svg
                    xmlns="http://www.w3.org/2000/svg"
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
        </>
    );
}