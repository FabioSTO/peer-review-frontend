import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { addOrganization } from '../hooks/addOrganization';
import { useUserContext } from '../context/UserContext';

const Overlay = ({setShowProOverlay}) => {
  const [error, setError] = useState(null);
  const [proName, setProName] = useState("");
  const [proDesc, setProDesc] = useState("");
  const [chosenMemberAccount, setChosenMemberAccount] = useState(null);
  const { userID, memberAccounts } = useUserContext();

  const handleAddProject = async (e) => {
    e.preventDefault();
    /*try {   TENGO QUE HACERLOOOOOOO
      await addOrganization(orgName, orgDesc, chosenMemberAccount)
    } catch (error) {
      setError(error.message)
    }*/
  }

  const handleMemberAccountChange = (e) => {
    setChosenMemberAccount(e.target.value);
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={() => setShowProOverlay(false)} id='closeOverlayButton'>Cerrar</button>
        <h2 id='title'>Create new project</h2>
        <form id='form' onSubmit={handleAddProject}>
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
          <input type='text' placeholder='Name' className='inputForm' id='name' value={proName} onChange={e => setProName(e.target.value)} required/>
          <h4>Description </h4>
          <textarea placeholder='Description' className='inputForm' id='description' value={proDesc} onChange={e => setProDesc(e.target.value)} required/>
          {error && <div className="error-message" id='errorText'>{error}</div>}
          <button className='botonRegister' id='createButton'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default Overlay;