import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { addProject } from '../hooks/addProject';
import { useUserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Overlay = ({setShowProOverlay, orgMembers, orgName, setShowAlert}) => {
  const [error, setError] = useState(null);
  const [proName, setProName] = useState("");
  const [proDesc, setProDesc] = useState("");
  const [chosenMemberAccount, setChosenMemberAccount] = useState(null);
  const { userID, memberAccounts } = useUserContext();

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await addProject(orgName, proName, proDesc, chosenMemberAccount);
      setShowProOverlay(false);
      setShowAlert({ show:true, message:"¡El proyecto ha sido creado con éxito!" });
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
        <button onClick={() => setShowProOverlay(false)} id='closeOverlayButton' style={{cursor: "pointer"}}><FontAwesomeIcon icon={faTimes} /></button>
        <h2 id='title'>Create new project</h2>
        <form id='form' onSubmit={handleAddProject}>
          <select className='inputForm' id="select" list="memberAccounts" placeholder='Members' onChange={handleMemberAccountChange} required>
          {memberAccounts.length > 0 ? (
            <>
              <option value="">Choose an ADMIN for the project </option>
              {orgMembers.map((memberAccount, index) => (
                <option key={index} id='option' value={memberAccount.member_account}>{memberAccount.member_account}</option>
              ))}
            </>
          ) : (
            <option value="" disabled>No GitHub accounts available</option>
          )}
          </select>
          <h4>Project name</h4>  
          <input type='text' placeholder='Name' className='inputForm' id='name' value={proName} onChange={e => setProName(e.target.value)} required/>
          <h4>Project description </h4>
          <textarea placeholder='Description' className='inputForm' id='description' value={proDesc} onChange={e => setProDesc(e.target.value)} required/>
          {error && <div className="error-message" id='errorText'>{error}</div>}
          <button className='botonRegister' id='createButton'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default Overlay;