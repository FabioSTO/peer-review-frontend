import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { markClosed } from '../hooks/markClosed';

const Overlay = ({setShowConfirmCloseOverlay, setShowAlert, reviewID, setReviewInfo, setSelectedOption}) => {
  const [error, setError] = useState(null);

  const handleMarkClosed = async (event) => {
    try {
      const result = await markClosed( reviewID );
      setShowAlert({ show:true, message:"¡Review cerrada con éxito!" });
      setShowConfirmCloseOverlay(false)
      setReviewInfo(null);
      setSelectedOption("submissions")
      setTimeout(() => {
        setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
      }, 4000);
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ width: "fit-content", height: "25vh" }}>
        <h2 id='title'>Are you sure you want to mark this review as closed?</h2>
        <div style={{display: 'flex', margin: 'auto', gap: "80px"}}>
          <h4 onClick={handleMarkClosed} id='markAsClosed' style={{color: "orange", backgroundColor : "#201863", cursor: "pointer", padding: "5px", border: "solid 2px", borderRadius: "10px"}}>Yes</h4>
          <h4 onClick={() => setShowConfirmCloseOverlay(false)} id='markAsClosed' style={{color: "orange", backgroundColor : "#201863", cursor: "pointer", padding: "5px", border: "solid 2px", borderRadius: "10px"}}>No</h4>
        </div>
        
      </div>
    </div>
  );
};

export default Overlay;