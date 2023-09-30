import React, { useState, useEffect } from 'react';
import '../Css/PopUp.css';

function PopUp({ message, onClose }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState(''); 

  useEffect(() => {
    if (message) {
      setShowPopUp(true);
      setPopupMessage(message);
    } else {
      setShowPopUp(false);
      setPopupMessage(''); 
    }
  }, [message]);

  const closePopup = () => {
    setShowPopUp(false);
    setPopupMessage(''); 

    if (onClose) {
      onClose();
    }
  };

  return (
    showPopUp && (
      <div className="popup-overlay">
        <div className="popup-container">
          <span className="close-popup" onClick={closePopup}>&times;</span>
          <div className="popup-content">
            {}
            <h2>Form Error</h2>
            <p>{popupMessage}</p> {}
          </div>
        </div>
      </div>
    )
  );
}

export default PopUp;
