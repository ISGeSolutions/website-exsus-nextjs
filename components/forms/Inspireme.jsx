import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { element } from 'prop-types';
import { destinationService, holidaytypesService, userService, homeService, alertService } from 'services';

export { Inspireme };

function Inspireme() {

    const [destinationLandingList, setDestinationLandingList] = useState();
    const [holidaytypesLandingList, setHolidaytypesLandingList] = useState();

    useEffect(() => {

        destinationService.getDestinationLandingList().then(x => {
            // console.log('getDestinationLandingList', x);
            setDestinationLandingList(x.data);
            // setDestinationLandingDetails(x)
        });

        holidaytypesService.getHolidaytypesLandingList().then(x => {
            setHolidaytypesLandingList(x.data);
        });

    }, []);

    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        destination: Yup.string()
            .required('Destination is required'),
        reason: Yup.string()
            .required('Reason is required'),
        month: Yup.string()
            .required('Month is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // console.log('onSubmit', data);
        return homeService.inspireMe(data)
            .then(() => {
                alertService.success('Make an enquiry successful', { keepAfterRouteChange: true });
                router.push('home');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="banner_dropdwn_row">
                <div className="container-md">
                    <div className="banner_dropdwn_inr d-block d-md-flex">
                        <div className="banner_dropdwn_blk">
                            <div className="select_drpdwn">
                                <select aria-label="Choose a destination" name="destination" {...register('destination')} className={`form-select ${errors.destination ? 'is-invalid' : ''}`}>
                                    <option value="">Choose a destination</option>
                                    {destinationLandingList?.map((element, i) => (
                                        <option key={element?.id} value={element?.attributes?.destination_code}>{element?.attributes?.destination_name}</option>
                                    ))}
                                    {/* <option value="Asia">Asia</option>
                                    <option value="Europe">Europe</option>
                                    <option value="South America">South America</option>
                                    <option value="Indian Subcontinent">Indian Subcontinent</option>
                                    <option value="North America & Caribbean">North America & Caribbean</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Central America">Central America</option>
                                    <option value="Australasia & South Pacific">Australasia & South Pacific</option>
                                    <option value="Middle East & North Africa">Middle East & North Africa</option>
                                    <option value="Indian ocean">Indian ocean</option> */}
                                </select>
                                <div className="invalid-feedback mb-1">{errors.destination?.message}</div>
                            </div>
                        </div>
                        <div className="banner_dropdwn_blk ps-0 ps-md-2">
                            <div className="select_drpdwn">
                                <select aria-label="Choose a reason" name="reason" {...register('reason')} className={`form-select ${errors.reason ? 'is-invalid' : ''}`}>
                                    <option value="">Choose a reason</option>                                    
                                    {holidaytypesLandingList?.map((element, i) => (
                                        <option key={element?.id} value={element?.attributes?.holiday_types_code}>{element?.attributes?.holiday_type_name}</option>
                                    ))}
                                    {/* <option value="Adventure Holidays">Adventure Holidays</option>
                                    <option value="Classic Journeys">Classic Journeys</option>
                                    <option value="Trains, Planes, Cars & Cruises">Trains, Planes, Cars & Cruises</option>
                                    <option value="Food & Culture Holidays">Food & Culture Holidays</option>
                                    <option value="Family Holidays">Family Holidays</option>
                                    <option value="Once in a lifetime holidays">Once in a lifetime holidays</option>
                                    <option value="Short breaks & Escapes">Short breaks & Escapes</option>
                                    <option value="Wildlife & Safari Holidays">Wildlife & Safari Holidays</option>
                                    <option value="Luxury Beach holidays">Luxury Beach holidays</option>
                                    <option value="Special occasions">Special occasions</option> */}
                                </select>
                                <div className="invalid-feedback mb-1">{errors.reason?.message}</div>
                            </div>
                        </div>
                        <div className="banner_dropdwn_blk ps-0 ps-md-2">
                            <div className="select_drpdwn">
                                <select aria-label="Choose a month" name="month" {...register('month')} className={`form-select ${errors.month ? 'is-invalid' : ''}`}>
                                    <option value="">Choose a month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                                <div className="invalid-feedback mb-1">{errors.month?.message}</div>
                            </div>
                        </div>
                        <div className="banner_inspire_btn ps-0 ps-md-2">
                            <button type="submit" className="btn btn-primary prmry_btn">Inspire me
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}