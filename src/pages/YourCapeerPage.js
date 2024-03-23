import '../css/yourcapeerpage.css';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar';
import TopMenu from '../components/TopMenu';
import MyReviews from '../components/MyReviews';
import MySubmissions from '../components/MySubmissions';
import ProfileSidebar from '../components/ProfileSidebar';
import { useMenuContext } from '../context/MenuContext'; 
import MyOrganizations from '../components/MyOrganizations';

function YourCapeerPage() {

  const { selectedTopMenu, profileSidebarVisible } = useMenuContext();

  let interfaceComponent;

  // Aquí definimos qué componente mostrar basado en el valor de selectedInterface
  if (selectedTopMenu === 'reviews') {
    interfaceComponent = <MyReviews />;
  } else if (selectedTopMenu === 'submissions') {
    interfaceComponent = <MySubmissions />;
  } else if (selectedTopMenu === 'organizations') {
    interfaceComponent = <MyOrganizations />
  } else {
    interfaceComponent = null; // Puedes definir un componente predeterminado aquí si es necesario
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