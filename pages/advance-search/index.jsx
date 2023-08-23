import { useState, useEffect } from 'react';
import { Link, Spinner, Signup } from 'components';
import { destinationService, alertService, userService } from 'services';
import { Inspireme } from 'components';
import Head from 'next/head';
import { NavLink } from 'components';
import { useRouter } from 'next/router';
import generateDynamicLink from 'components/utils/generateLink';
import Image from "next/image";

export default Index;

function Index() {

    const router = useRouter();

    let regionWiseUrl = '/uk';
    if (typeof window !== 'undefined') {
        if (window && window.site_region) {
            regionWiseUrl = '/' + window.site_region;
            // setMyVariable(window.site_region);
        }
    }

    const [itineraries, setItineraries] = useState(null);

    const generateDynamicLink = (item) => {
        // console.log('item', item);
        return regionWiseUrl + `/itinerarydetail?itinerarycode=vietnam-in-classic-style&destinationcode=asia`;
    };

    const handleRedirect = () => {
        router.push(regionWiseUrl + `/destinations/africa/africa-itineraries/vietnam-in-classic-style`);
    };

    useEffect(() => { 
        destinationService.getAllItineraries().then(x => {
            setItineraries(x.data);
        });
        // return homeService.inspireMe(data)
        //     .then(() => {
        //         alertService.success('Make an enquiry successful', { keepAfterRouteChange: true });
        //         router.push('home');
        //     })
        //     .catch(alertService.error);
    }, []);

    return (
        <>
            <section className="banner_blk_row" style={{ height: `300px` }}>
                <Inspireme />
            </section>
            <section className="favrites_blk_row favrites_blk_no_slider_row light_dark_grey">
                <div className="container-md">
                    <h3 className="title_cls">Favourite trip ideas</h3>
                    <div className="card_slider_row">
                        <div className="carousel00">
                            <div className="row">
                                {itineraries?.map((item) => (
                                    <div className="col-sm-6 col-lg-4" key={item.id}>
                                        <div className="card_slider_inr">
                                            <div className="card_slider">
                                                <NavLink href={generateDynamicLink(item)} className="card_slider_img">
                                                    {item?.attributes?.itinerary_images?.data.map((element, index) => (
                                                        element.attributes.image_type == 'thumbnail' ? (
                                                            <img key={index} src={`https://d33ys3jnmuivbg.cloudfront.net/ilimages` + element.attributes.image_path} alt="destination card01" className="img-fluid" />
                                                        ) : (
                                                            ''
                                                        )
                                                    ))}
                                                    {/* <img src={backgroundThumbnailImg(item?.attributes?.itinerary_images?.data)} alt="destination card01" className="img-fluid" /> */}
                                                </NavLink>
                                                <div className="card_slider_cnt">
                                                    <h4><a href="#">{item?.attributes?.itin_name}</a></h4>
                                                    <ul>
                                                        <li>{item?.attributes?.header_text}</li>
                                                        <li>Indonesia</li>
                                                        <li>{item?.attributes?.itinerary_country_contents?.data[0]?.attributes?.guideline_price_notes_index}</li>
                                                        <li>Travel to:<span>{item?.attributes?.sub_header_text}</span></li>
                                                    </ul>
                                                </div>
                                                <button className="btn card_slider_btn">
                                                    <span>{item?.attributes?.no_of_nites_notes}</span>
                                                    <span className="view_itnry_link" onClick={handleRedirect}>View this itinerary<em className="fa-solid fa-chevron-right"></em></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
