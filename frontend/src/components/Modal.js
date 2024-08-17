import React from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

ReactModal.setAppElement('#root'); // Bind modal to the root of your app

const Modal = ({ isOpen, onRequestClose, title, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-header">
                <h2>{title}</h2>
                <button onClick={onRequestClose} className="modal-close-btn">&times;</button>
            </div>
            <div className="modal-content">
                {children}
            </div>
        </ReactModal>
    );
};

export default Modal;
