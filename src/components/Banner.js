import anonymous from '../img/anonymous.jpg'
import capiLogo from '../img/capiLogo.jpeg'
import '../css/banner.css'
import { useUserContext } from '../context/UserContext';
import { useMenuContext } from '../context/MenuContext';
import { getMemberData } from '../hooks/getMemberData';
import { useEffect, useState } from 'react';

function Banner() {
  const { profileSidebarVisible, setProfileSidebarVisible } = useMenuContext();
  const { username, userID, userEmail, userTags, setMemberAccounts, memberAccounts } = useUserContext();
  const [transitionSidebar, setTransitionSidebar] = useState(false)

  const toggleSidebar = () => {
    setTransitionSidebar(true);
    setProfileSidebarVisible(!profileSidebarVisible);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMemberData(userID);
        if (data) {
          setMemberAccounts(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [userID]);

  return (
    <div className="banner"> 
      <img className='capiLogo' src={capiLogo} alt='Logo de capibara'/>
      <div className='title'> CAPEER</div>
      {username && <h4 className='username'>{username}</h4>}
      <img className='userLogo' src={anonymous} alt='Foto de perfil sin registrarse' onClick={toggleSidebar}/>
    </div>
  )
}

export default Banner;