import ReactDOM from "react-dom";
import { useRef } from "react";

function Modal({ portalSelector, children, onDismiss }) {
    const modal = useRef();

    const onClick = (event) => {
        if (!modal.current.contains(event.target)) onDismiss();
    };

    const renderModal = () => {
        return (
            <div className="ui dimmer modals visible active" onClick={onClick}>
                <div ref={modal} className="ui standard modal visible active">
                    {children}
                </div>
            </div>
        );
    };

    return ReactDOM.createPortal(
        renderModal(),
        document.querySelector(portalSelector)
    );
}

Modal.defaultProps = {
    portalSelector: "#modal",
};

export default Modal;
