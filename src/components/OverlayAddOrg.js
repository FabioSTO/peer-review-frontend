import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { addOrganization } from '../hooks/addOrganization';
import { useUserContext } from '../context/UserContext';

const Overlay = ({setShowOverlay}) => {
  const [error, setError] = useState(null);
  const [orgName, setOrgName] = useState(null);
  const [orgDesc, setOrgDesc] = useState(null);
  const [chosenMemberAccount, setChosenMemberAccount] = useState(null);
  const { userID, memberAccounts } = useUserContext();

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    try {
      await addOrganization(orgName, orgDesc, chosenMemberAccount)
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
        <button onClick={() => setShowOverlay(false)} id='closeOverlayButton'>Cerrar</button>
        <h2 id='title'>Create new organization</h2>
        <form id='form' onSubmit={handleAddOrganization}>
          <select className='inputForm' id="select" list="memberAccounts" placeholder='Members' onChange={handleMemberAccountChange} required>
            <option value="">Choose GitHub account...</option>
            {memberAccounts.map((memberAccount, index) => ( <option key={index} id='option' value={memberAccount.member_account}>{memberAccount.member_account}</option>))}
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