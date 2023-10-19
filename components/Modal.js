// components/Modal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

function MyModal({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
        >
            <div className="modal fade succs_msg_parnt" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="succs_msg_tick">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" /></svg>
                            </span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Successfully Submitted</h5>
                            <p>Your enquiry has been submitted successfully</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button onClick={onRequestClose}>Close Modal</button> */}
        </Modal>
    );
}

export default MyModal;
