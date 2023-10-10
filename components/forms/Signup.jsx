import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { homeService, alertService } from 'services';

export { Signup };

function Signup() {

    useEffect(() => {

    }, []);

    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        fullnameAndTitle: Yup.string()
            .required('Full name and title is required'),
        email: Yup.string()
            .required('Email is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // get functions to build form with useForm() hook
    function onSignup(data) {
        let signupData = {
            "data":
            {
                "client_name": `${data.fullnameAndTitle}`,
                "email_id": `${data.email}`,
                "source_of_origin": "newsletter",
                "source_of_origin_reference": "",
                "opt_in_ind": true
            }
        }

        return homeService.signUp(signupData)
            .then(() => {
                alertService.success('Sign up successfull', { keepAfterRouteChange: true });
                // router.push('home');
            })
            .catch(alertService.error);
    }

    return (
        <form className="newslettr_form d-block d-sm-flex" onSubmit={handleSubmit(onSignup)}>
            <div className="newlettr_inpt">
                <input type="text" placeholder="Full name and title" name="fullnameAndTitle" {...register('fullnameAndTitle')} className={`form-control ${errors.fullnameAndTitle ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback mb-1">{errors.fullnameAndTitle?.message}</div>
            </div>
            <div className="newlettr_inpt ps-0 ps-sm-2">
                <input type="text" placeholder="Email" name="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback mb-1">{errors.email?.message}</div>
            </div>
            <div className="newlettr_btn ps-0 ps-sm-2">
                <button type="submit" className="btn btn-primary prmry_btn">Sign up
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 267 512.43"><path fillRule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg>
                </button>
            </div>
        </form>
    );
}