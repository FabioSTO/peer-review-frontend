import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/overlaynoaccount.css'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const OverlayAI = ({ comment, setShowAIOverlay }) => {
  const client_id = process.env.REACT_APP_CLIENT_ID;

  const loginUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`;

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ width: "30vw", height: "45vh" }}>
      <button onClick={() => setShowAIOverlay(false)} id='closeOverlayButton' style={{cursor: "pointer"}}><FontAwesomeIcon icon={faTimes} /></button>
        <div class="container" style={{ height: "30vh" }}>
          <h2 id='title'>AI Response</h2>
          <h4 className='invitationsOverlay' id='aiCommentOver' style={{overflow: "auto", padding: "20px" }}>{comment}</h4>
        </div>
      </div>
    </div>
  );
};

export default OverlayAI;