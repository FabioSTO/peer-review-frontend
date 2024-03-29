import { useState, useEffect } from 'react';
import anonymous from '../img/anonymous.jpg'
import '../css/profilesidebar.css';
import { useUserContext } from '../context/UserContext';
import { useMenuContext } from '../context/MenuContext';
import { getMemberData } from '../hooks/getMemberData';

function ProfileSidebar() {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const { username, userID, userEmail, userTags, memberAccounts, setMemberAccounts } = useUserContext();
  const { profileSidebarVisible, setProfileSidebarVisible, errorMessage } = useMenuContext();
  const [transitionSidebar, setTransitionSidebar] = useState(false)

  useEffect(() => {
    setTransitionSidebar(true);
  });
  
  const handleCloseSidebar = () => {
    setProfileSidebarVisible(false)
  }

  const loginUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`;

  return (
    <div className={`profileSidebar ${transitionSidebar ? 'show' : ''}`}>
      <div className='profileSidebarPicNameClose'>
        <img className='userLogo' id='logo' src={anonymous} alt='Foto de perfil sin registrarse'/>
        <h4 id='username'>{username}</h4>
        <button onClick={handleCloseSidebar} id='boton'>Cerrar</button>
      </div>
      <hr className="separator" />
      <h4 className='linkedGitHubAccounts'>Linked GitHub accounts</h4>
      <ul className='gitAccountList'>
        {memberAccounts !== null && memberAccounts.map((memberAccount, index) => ( <li key={index} id='gitAccount'>{memberAccount.member_account}</li>))}
      </ul>
      {errorMessage && <div className="error-message" id='errorText'>{errorMessage}</div>}
      <a href={loginUrl} className='addGitHubButton'>Add GitHub account</a>
      <hr className="separator" />
    </div>
  )
}

export default ProfileSidebar;