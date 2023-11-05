import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import { FriendlyUrl } from '../../components';
import { privacypolicyService } from '../../services';
import Head from "next/head";

export default Index;

function Index() {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [privacyPolicyData, setprivacyPolicyData] = useState(null);
    const [headingTag, setHeadingTag] = useState(null);
    const [title, setTitle] = useState(null);
    const [metaDescription, setMetaDescription] = useState(null);
    const [longText, setLongText] = useState(null);
    const [rightHeader, setRightHeader] = useState(null);
    const [rightCorner, setRightContent] = useState(null);
    const [customData, setCustomData] = useState([]);


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
        whyusService.getDictionaryDetails(matches, region).then((responseObj) => {
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
                setLongText(modifiedString);
            }
        });
    };

    useEffect(() => {

        privacypolicyService
            .getPrivacyPolicyPage()
            .then((x) => {
                // debugger;
                setprivacyPolicyData(x.data[0]);
                const data = x.data[0]?.attributes?.custom_page_contents?.data;
                let modifiedString = "";
                setCustomData(data);
                if (data) {
                    data.forEach((element, index) => {
                        if (element?.attributes?.content_name == 'HeadingTag') {
                            setHeadingTag(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Title') {
                            setTitle(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'MetaDescription') {
                            setMetaDescription(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Long_Text') {
                            modifiedString = element?.attributes?.content_value.replace(/class/g, "className").replace(/h3/g, "h2").replace(/class/g, "className").replace(/<!-- SOF Top text html -->/g, "").replace(/class/g, "className").replace(/<!-- EOF Top text html -->/g, "");
                        } else if (element?.attributes?.content_name == 'Right_Header') {
                            setRightHeader(element?.attributes?.content_value);
                        } else if (element?.attributes?.content_name == 'Right_Corner') {
                            setRightCorner(element?.attributes?.content_value);
                        }
                    });

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
                                // console.log(modifiedString);
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
                }
                setIsLoading(false);
            })
            .catch((error) => {
                // Handle any errors here
                setIsLoading(false);
            });
        // userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
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
                        <section className="trvl_info_row privacy_policy_row">
                            <div className="container">
                                <div className="bookmark_row">
                                    <FriendlyUrl data={"home/" + privacyPolicyData?.attributes?.page_friendly_url}></FriendlyUrl>
                                </div>
                                <div className="trvl_info_cntnt">
                                    <h2 className="trvl_title">{headingTag}</h2>
                                    {/* <div dangerouslySetInnerHTML={{ _html: longText }} /> */}

                                    {/* <p className="mb-4 text-start">This Privacy Policy explains in detail the types of personal data we may collect about you when you interact with us. It also explains how we’ll store and handle that data, and keep it safe.</p>
                        <p className="text-start">We know that there’s a lot of information here, but we want you to be fully informed about your rights, and how Exsus Travel Limited uses your data. We hope the following sections will answer any questions you have but if not, please do get in touch with us. We may change this policy from time to time. Please check back for updates so you are always fully aware of what information is collected and how it is used.</p> */}
                                </div>
                            </div>
                        </section>


                        <section className="make_enqury_row">
                            <div className="container">
                                <h3>{customData.filter(res => res.attributes?.content_name == "PrivacyPolicyNextTripHeader")[0]?.attributes?.content_value}</h3>
                                <p>{customData.filter(res => res.attributes?.content_name == "PrivacyPolicyNextTripTelephoneText")[0]?.attributes?.content_value}</p>
                                <button className="btn prmry_btn make_enqury_btn" onClick="window.open('contact_us.html')">{customData.filter(res => res.attributes?.content_name == "PrivacyPolicyNextTripEnqBtnText")[0]?.attributes?.content_value}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                                </button>
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
