import anonymous from '../img/anonymous.jpg'
import capiLogo from '../img/capiLogo.jpeg'
import '../css/banner.css'
import { useUserContext } from '../context/UserContext';
import { useMenuContext } from '../context/MenuContext';

function Banner() {
  const { profileSidebarVisible, setProfileSidebarVisible } = useMenuContext();
  const { username, userEmail, userTags } = useUserContext();

  const toggleSidebar = () => {
    setProfileSidebarVisible(!profileSidebarVisible);
  };

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