import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { alertService, AlertType } from 'services';

export { Alert };

Alert.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

Alert.defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }) {
    const router = useRouter();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    setAlerts(alerts => {
                        // filter out alerts without 'keepAfterRouteChange' flag
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                        // set 'keepAfterRouteChange' flag to false on the rest
                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    // add alert to array
                    setAlerts(alerts => ([...alerts, alert]));

                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });


        // clear alerts on location change
        const clearAlerts = () => {
            setTimeout(() => alertService.clear(id));
        };
        router.events.on('routeChangeStart', clearAlerts);

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe to avoid memory leaks
            subscription.unsubscribe();
            router.events.off('routeChangeStart', clearAlerts);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function removeAlert(alert) {
        if (fade) {
            // fade out alert
            const alertWithFade = { ...alert, fade: true };
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            // remove alert
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    };

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div className="container">
            <div className="mt-3">
                {/* {alerts.map((alert, index) =>
                    <div key={index} className={cssClasses(alert)}>
                        <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
                    </div>
                )} */}


                <div className="modal fade error_msg_parnt" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span className="error_msg_cross">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5>Error!</h5>
                                <p>Please correct the following errors and try again:</p>
                                <ul>
                                    {alerts.map((alert, index) =>
                                        <li key={index} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg><span dangerouslySetInnerHTML={{ __html: alert.message }}></span></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
