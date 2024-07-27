import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { addOrganization } from '../hooks/addOrganization';
import { useUserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Overlay = ({setShowOrgOverlay, setShowAlert}) => {
  const [error, setError] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [chosenMemberAccount, setChosenMemberAccount] = useState(null);
  const { userID, memberAccounts } = useUserContext();

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    try {
      await addOrganization(orgName, orgDesc, chosenMemberAccount);
      setShowOrgOverlay(false);
      setShowAlert({ show:true, message:"¡La organización ha sido creada con éxito!" });
      setTimeout(() => {
        setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
      }, 4000);
    } catch (error) {
      setError(error.message)
    }
  }

  const handleMemberAccountChange = (e) => {
    setChosenMemberAccount(e.target.value);
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={() => setShowOrgOverlay(false)} id='closeOverlayButton' style={{cursor: "pointer"}}><FontAwesomeIcon icon={faTimes} /></button>
        <h2 id='title'>Create new organization</h2>
        <form id='form' onSubmit={handleAddOrganization}>
          <select className='inputForm' id="select" list="memberAccounts" placeholder='Members' onChange={handleMemberAccountChange} required>
          {memberAccounts.length > 0 ? (
            <>
              <option value="">Choose GitHub account...</option>
              {memberAccounts.map((memberAccount, index) => (
                <option key={index} id='option' value={memberAccount.member_account}>{memberAccount.member_account}</option>
              ))}
            </>
          ) : (
            <option value="" disabled>No GitHub accounts available</option>
          )}
          </select>
          <h4>Name</h4>  
          <input type='text' placeholder='Name' className='inputForm' id='name' value={orgName} onChange={e => setOrgName(e.target.value)} required/>
          <h4>Description </h4>
          <textarea placeholder='Description' className='inputForm' id='description' value={orgDesc} onChange={e => setOrgDesc(e.target.value)} required/>
          {error && <div className="error-message" id='errorText'>{error}</div>}
          <button className='botonRegister' id='createButton'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default Overlay;