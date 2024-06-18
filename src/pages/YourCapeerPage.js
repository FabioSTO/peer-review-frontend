import '../css/yourcapeerpage.css';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar';
import TopMenu from '../components/TopMenu';
import MyReviews from '../components/MyReviews';
import MyTasks from '../components/MyTasks';
import ProfileSidebar from '../components/ProfileSidebar';
import { useMenuContext } from '../context/MenuContext'; 
import MyOrganizations from '../components/MyOrganizations';
import MyProject from '../components/MyProject';
import { useUserContext } from '../context/UserContext';
import OverlayNoAccount from '../components/OverlayNoAccounts';
import OverlayChooseAccount from '../components/OverlayChooseAccount';
import { useState } from 'react';

function YourCapeerPage() {

  const { setTopSelectedMenu, selectedTopMenu, profileSidebarVisible, selectedProject } = useMenuContext();
  const { memberAccounts, activeMemberAccount } = useUserContext();
  const [ showOverlayChooseAccount, setShowOverlayChooseAccount ] = useState(true);

  let interfaceComponent;

  // Qué componente mostrar del topMenu
  if (selectedTopMenu === 'reviews') {
    interfaceComponent = <MyReviews />;
  } else if (selectedTopMenu === 'tasks') {
    interfaceComponent = <MyTasks />;
  } else if (selectedTopMenu === 'organizations') {
    interfaceComponent = <MyOrganizations />
  } else if (selectedTopMenu === 'project') {
    interfaceComponent = <MyProject />
  }else {
    setTopSelectedMenu('organizations')
    interfaceComponent = <MyOrganizations />; // Componente predeterminado
  }

  return (
    <div className='YourCapeerPage'>
      <div className='fixid'><Banner /></div>
      <div className="mainInterface">
        <div className='fixid'><Sidebar /></div>
        <div className='subMainInterface'>
          <div className='fixid'><TopMenu /></div>
          { interfaceComponent }
          {!memberAccounts && <OverlayNoAccount />}
          {memberAccounts !== null && showOverlayChooseAccount && (memberAccounts.length > 1) && <OverlayChooseAccount setShowOverlayChooseAccount={setShowOverlayChooseAccount}/>}
        </div>
      </div>
      {profileSidebarVisible && <div className='fixid'><ProfileSidebar /></div>}
    </div>
  );
}

export default YourCapeerPage;