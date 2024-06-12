import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { useUserContext } from '../context/UserContext';
import { inviteMembers } from '../hooks/inviteMembers';

const Overlay = ({orgName, setShowMemberOverlay, setShowAlert}) => {
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { userID } = useUserContext();
  
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      if (!(members.length > 0)) {
        setError("No has añadido ningún usuario para añadir, presiona ENTER en la caja");
        return;
      }
      const result = await inviteMembers(userID, orgName, members)
      if (result.alreadyInvitedMembers && result.alreadyInvitedMembers.length > 0) {
        setError("Algunos usuarios ya estaban invitados: " + result.alreadyInvitedMembers);
        if (result.members.length > result.alreadyInvitedMembers.length) {
          setShowAlert({ show:true, message:"¡Invitaciones enviadas con éxito!" });
          setTimeout(() => {
            setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
          }, 4000);
        }
      } else {
        setShowMemberOverlay(false)
        setShowAlert({ show:true, message:"¡Invitaciones enviadas con éxito!" });
        setTimeout(() => {
          setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
        }, 4000);
      }
      
      
    } catch (error) {
      setError(error.message)
    }
  }

  const handleInputChange = (e) => {
    let value = e.target.value;

    setInputValue(value);
  };

  const handleAddMemberPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newMember = e.target.value;
      setInputValue("")
      setMembers([...members, newMember]);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={() => setShowMemberOverlay(false)} id='closeOverlayButton'>Cerrar</button>
        <h2 id='title'>{orgName}</h2>
        <h3 id='title'>Invite new members</h3>
        <form id='form' onSubmit={handleAddMember}>
          <h4>Enter GitHub accounts</h4>  
          <div id='tagsDiv'>
            <input className='inputForm' id="tagsListInput" placeholder='Members' value={inputValue} onChange={handleInputChange} onKeyDown={handleAddMemberPress}/>
            {members.length > 0 && 
            <ul className='tagsEnteredList'>
              {members.map((member, index) => (
                <li key={index} className='tagsEntered'>{member}</li>
              ))}
            </ul>
            }
          </div>
          {error && <div className="error-message" id='errorText'>{error}</div>}
          <button className='botonRegister' id='createButton'>Invite members</button>
        </form>
      </div>
    </div>
  );
};

export default Overlay;