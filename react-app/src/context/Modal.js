import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = ( showWarning ) => {
    let shouldClose = null
    if ( showWarning === true ) {
      shouldClose = window.confirm(
        "Hmmmm, are you sure you want to exit? Your progress will not be saved."
      );
      if ( !shouldClose ) {
        return;
      }
      setModalContent( null ); // clear the modal contents
    } else {
      setModalContent( null ); // clear the modal contents
    }


    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext( ModalContext );
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  const showCloseWarning =
    modalContent.props && modalContent.props.showWarning !== undefined
      ? modalContent.props.showWarning
      : false;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={ () => closeModal( showCloseWarning ) } />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
