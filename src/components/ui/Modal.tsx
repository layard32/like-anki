import React from 'react';

interface Props {
    modalName: string;
    handleModal: () => void;
    sonComponent?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ handleModal, modalName, sonComponent }: Props) => {
    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> {modalName} </h5>
                        <button type="button" className="btn-close" onClick={handleModal}></button>
                    </div>
                    {sonComponent}
                </div>
            </div>
        </div>
    );
};

export default Modal;