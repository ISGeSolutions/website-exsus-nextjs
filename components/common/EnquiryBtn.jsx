import * as React from 'react';
import { useState, useEffect } from 'react';
import { destinationService } from '../../services/destinations.service';
import { useRouter } from 'next/router';

export { EnquiryButton };

function EnquiryButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    const [telePhoneNumber, SetTelePhoneNumber] = useState();
    const router = useRouter();

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
        router.push(regionWiseUrl + `/make-an-enquiry`); // Navigate to the /enquiry page
    };

    const websiteContentCheck = (matches, modifiedString) => {
        destinationService
            .getDictionaryDetails(matches, region)
            .then((responseObj) => {
                if (responseObj) {
                    const res = responseObj?.data;
                    res.forEach((element, index) => {
                        const replacement = element?.attributes?.content_translation_text;
                        const matchString = element?.attributes?.content_word;
                        const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
                        if (checkStr && replacement) {
                            modifiedString = modifiedString.replace(checkStr, replacement);
                        }
                    });

                    // Set the modified string in state
                    // setnewValueWithBr(modifiedString);
                }
            });
    };

    useEffect(() => {

        let modifiedString = "${TelephoneNumber}";

        // Find and store matches in an array
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
                            websiteContentCheck(matches, modifiedString);
                            throw new Error("Loop break");
                        } else {
                            replacement = storedData[matchString];
                        }
                        const checkStr = new RegExp(`\\$\\{${matchString}\\}`, "g");
                        if (checkStr && replacement) {
                            modifiedString = modifiedString.replace(
                                checkStr,
                                replacement
                            );
                        }
                    });
                    // Set the modified string in state
                    SetTelePhoneNumber(modifiedString);
                } catch (error) {
                    if (error.message === "Loop break") {
                        // Handle the loop break here
                        //  ("Loop has been stopped.");
                    } else if (error.message === "Region not found") {
                        // Handle the loop break here
                        //  ("Loop has been stopped.");
                        SetTelePhoneNumber(modifiedString);
                    }
                }
            }
        } else {
            if (matches) {
                websiteContentCheck(matches, region, modifiedString);
            }
        }
    }, []);

    return (
        <>
            <h3>YOUR JOURNEY STARTS HERE</h3>
            <p>
                call us on <span dangerouslySetInnerHTML={{ __html: telePhoneNumber }} /> to start planning your perfect trip
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