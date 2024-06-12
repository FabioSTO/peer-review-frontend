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

function YourCapeerPage() {

  const { selectedTopMenu, profileSidebarVisible, selectedProject } = useMenuContext();

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
    interfaceComponent = null; // Componente predeterminado
  }

  return (
    <div className='YourCapeerPage'>
      <div className='fixid'><Banner /></div>
      <div className="mainInterface">
        <div className='fixid'><Sidebar /></div>
        <div className='subMainInterface'>
          <div className='fixid'><TopMenu /></div>
          { interfaceComponent }
        </div>
      </div>
      {profileSidebarVisible && <div className='fixid'><ProfileSidebar /></div>}
    </div>
  );
}

export default YourCapeerPage;