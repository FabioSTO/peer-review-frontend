import React, { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { respondInvitation } from '../hooks/respondInvitation';


const Overlay = ({invitations, setShowInvOverlay}) => {
  const [error, setError] = useState(null);
  const [responseInfo, setResponseInfo] = useState([]);

  const handleRespondInvitation = async (member_account, orgName, response, invIndex) => {
    try {
      const result = await respondInvitation(orgName, member_account, response);
      setResponseInfo(prevResponseInfo => [...prevResponseInfo, { index: invIndex, message: result.message }]);
    } catch (error) {
      setError(error.message)
    }
  }
  
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={() => setShowInvOverlay(false)} id='closeOverlayButton'>Cerrar</button>
        <h3 id='title'>Pending invitations</h3>
        <div className='invitationsOverlay'>
          {invitations.map((invitation, invIndex) => (
            <React.Fragment key={invIndex}>
            {responseInfo.some(item => item.index === invIndex) ? (
                <div id='invitationsContent'>
                  <div className="result-message">
                    {responseInfo.find(item => item.index === invIndex).message}
                  </div>
                </div>
              ) : (
                <div key={invIndex} id='invitationsContent'>
                  <h3>Invitación a <em>{invitation.member_account}</em> de <span style={{ color: 'lightblue' }}>{invitation.orgname}</span></h3>
                  <div className='checkCross'>
                    <h3 id='check' onClick={() => handleRespondInvitation(invitation.member_account, invitation.orgname, "ACCEPTED", invIndex)}>&nbsp;✔&nbsp;</h3>
                    <h3 id='cross' onClick={() => handleRespondInvitation(invitation.member_account, invitation.orgname, "DENIED", invIndex)}>❌</h3>
                  </div>
                </div>
              )}
          </React.Fragment>
          ))}
          {error && <div className="error-message" id='errorText'>{error}</div>}
        </div>
        
      </div>
    </div>
  );
};

export default Overlay;