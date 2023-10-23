// components/Alert.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

function Alert({ message, type, onClose }) {

    const onCloseFun = () => {
        $(".succss_msg_parnt").hide();
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        $(".succss_msg_parnt").hide();
    }, [message, type]);

    return (
        // <div className={`alert alert-${type}`}>
        //     <span>{message}</span>
        //     <button onClick={onClose}>&times;</button>
        // </div>
        <div className="succss_msg_parnt">
            <div className="succss_msg_cnt">
                <div className="succss_msg_inr">
                    <div className="modal-header">
                        <div className="succss_msg_cross">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-x" viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                        <button type="button" onClick={onCloseFun} className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5>Successfully Submitted</h5>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Alert };
