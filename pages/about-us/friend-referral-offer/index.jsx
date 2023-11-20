import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import { FriendlyUrl } from '../../../components';
import { referralSchmeService } from '../../../services';
import { NavLink } from "components";
import { destinationService } from '../../../services';
import Head from "next/head";
import { EnquiryButton } from '../../../components/common/EnquiryBtn';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
var Carousel = require('react-responsive-carousel').Carousel;

export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [referral, setReferralData] = useState(null);
    const [headingTag, setHeadingTag] = useState(null);
    const [title, setTitle] = useState(null);
    const [metaDescription, setMetaDescription] = useState(null);
    const [longText, setLongText] = useState(null);
    const [rightHeader, setRightHeader] = useState(null);
    const [rightCorner, setRightCorner] = useState(null);
    const [valueWithBr, setnewValueWithBr] = useState("");
    const [backgroundImage, setBackgroundImage] = useState([]);


    let region = "uk";
    let regionWiseUrl = "/uk";
    if (typeof window !== "undefined") {
        if (window && window.site_region) {
            regionWiseUrl = "/" + window.site_region;
            region = window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const websiteContentCheck = (matches, region, modifiedString) => {
        destinationService.getDictionaryDetails(matches, region).then((responseObj) => {
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
                setnewValueWithBr(modifiedString);
            }
        });
    };

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));
        referralSchmeService
            .getReferralPage()
            .then((x) => {
                // debugger;
                setReferralData(x.data[0]);
                const imageCheck = x.data[0].attributes.custom_page_images.data;
                const newBackgroundImages = [];
                imageCheck.forEach((element) => {
                    if (element.attributes.image_type == "banner") {
                        newBackgroundImages.push(element.attributes.image_path);
                    }
                });
                setBackgroundImage(newBackgroundImages);
                const data = x.data[0]?.attributes?.custom_page_contents?.data;
                let modifiedString = "";
                if (data) {
                    data.forEach((element, index) => {
                        if (element?.attributes?.content_name == 'HeadingTag') {
                            setHeadingTag(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Title') {
                            setTitle(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'MetaDescription') {
                            setMetaDescription(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Right_Header') {
                            setRightHeader(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Right_Corner') {
                            setRightCorner(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Long_Text') {
                            modifiedString = element?.attributes?.content_value;
                        }
                    });
                }


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
                                    websiteContentCheck(matches, region, modifiedString);
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
                            setLongText(modifiedString);

                            setIsLoading(false);
                        } catch (error) {
                            if (error.message === "Loop break") {
                                // Handle the loop break here
                            } else if (error.message === "Region not found") {
                                // Handle the loop break here
                                setLongText(modifiedString);

                            }
                        }
                    }
                }
            })
            .catch((error) => {
                // Handle any errors here
                setIsLoading(false);
            });


        const carousel = document.querySelector('#carouselExampleInterval');
        if (carousel) {
            new bootstrap.Carousel(carousel);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={metaDescription}></meta>

            </Head>
            <Layout>
                {isLoading ? (
                    // <MyLoader />
                    <div
                        className="full_loader_parnt_blk loader_parnt_blk"
                        style={{ display: `block !important` }}
                    >
                        <div className="loader-circle-2"></div>
                    </div>
                ) : (
                    <div>
                        <section className="banner_blk_row">
                            {/* <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={true} showThumbs={false}>
                    <div>
                        <img src="/assets/./../images//destination_banner.jpg" />
                    </div>
                </Carousel> */}
                            <div
                                id="carouselExampleInterval"
                                className="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-indicators">
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
                                    {/* <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> */}
                                </div>
                                <div className="carousel-inner">
                                    {backgroundImage.map((imagePath, index) => (
                                        <NavLink
                                            key={index}
                                            href="#"
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            data-bs-interval="5000"
                                        >
                                            <div
                                                className="banner_commn_cls"
                                                style={{ backgroundImage: `url(${imagePath})` }}
                                            ></div>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="trvl_info_row">
                            <div className="container">
                                <div className="bookmark_row">
                                    <FriendlyUrl data={"home/" + referral?.attributes?.page_friendly_url}></FriendlyUrl>
                                </div>
                                <div className="trvl_info_cntnt">
                                    <h2 className="trvl_title">{headingTag}</h2>
                                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: longText }} />
                                </div>
                            </div>
                        </section>

                        <section className="card_blk_row dark_grey">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card_blk_inr card_blk_overlay">
                                            <a href="#" >
                                                <img src="/images/about_us_card01.jpg" alt="Card image 07" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>Explore our destinations</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card_blk_inr card_blk_overlay">
                                            <a href="#">
                                                <img src="/images/about_us_card02.jpg" alt="Card image 08" className="img-fluid" />
                                                <div className="card_blk_cntnt card_blk_cntnt_top">
                                                    <div className="row align-items-center">
                                                        <div className="col-11">
                                                            <div className="card_blk_txt">
                                                                <h3>Explore our Holiday types</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                                        </div>
                                                    </div>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="make_enqury_row">
                            <div className="container">
                                <EnquiryButton />
                            </div>
                        </section>

                        <section aria-label="Sign up for newsletter" className="newslettr_row">
                            <div className="container">
                                <h4>Sign up for our newsletter</h4>
                                <h5>Receive our latest news and special offers</h5>
                                <form className="newslettr_form d-block d-sm-flex">
                                    <div className="newlettr_inpt">
                                        <input type="text" className="form-control" placeholder="Full name and title" />
                                    </div>
                                    <div className="newlettr_inpt ps-0 ps-sm-2">
                                        <input type="email" className="form-control" placeholder="Your email address" />
                                    </div>
                                    <div className="newlettr_btn ps-0 ps-sm-2">
                                        <button type="submit" className="btn btn-primary prmry_btn">Sign up
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                )}
            </Layout>
        </>

    );
}
