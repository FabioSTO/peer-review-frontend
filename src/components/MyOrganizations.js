import { useState, useEffect } from 'react';
import '../css/myorganizations.css';
import fondoProyecto1 from '../img/fondoProyecto1.jpeg';
import fondoProyecto2 from '../img/fondoProyecto2.jpeg';
import fondoProyecto3 from '../img/fondoProyecto3.jpeg';
import fondoProyecto4 from '../img/paraprobar/aroFuego.jpg';
import logoOrg1 from '../img/paraprobar/denodo.jpg';
import logoOrg2 from '../img/paraprobar/si.png';
import logoPro1 from '../img/paraprobar/pueblos-bonitos-cantabria.webp';
import logoPro2 from '../img/paraprobar/macaco_azul.jpg';
import logoPro3 from '../img/paraprobar/Mono.jpg';
import logoPro4 from '../img/paraprobar/aroFuego.jpg';
import eyeIcon from '../img/eyeIconGray.png';
import handshakeIcon from '../img/handshake.png';
import OverlayAddOrg from './OverlayAddOrg';

function MyOrganizations() {

  const [selectedOrgIndex, setSelectedOrgIndex] = useState(null);
  const [showBelow, setShowBelow] = useState(window.innerWidth > 1310);
  const [showOverlay, setShowOverlay] = useState(false);

  // Manejador para alternar el estado de un elemento
  const handleShowProjects = (orgIndex) => {
    setSelectedOrgIndex(orgIndex === selectedOrgIndex ? null : orgIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowBelow(window.innerWidth > 1310);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // Datos de ejemplo para renderizar

  const organizations = [
    {
      orgName: 'Organization 1',
      isAdmin: true,
      orgPicture: logoOrg1,
      projects: [
        { proName: 'Project Dumbo', proPicture: logoPro1, projectBackgroundPicture: fondoProyecto1},
        { proName: 'Project 2', proPicture: logoPro2, projectBackgroundPicture: fondoProyecto2},
        { proName: 'Project 3', proPicture: logoPro4, projectBackgroundPicture: fondoProyecto4}
      ]
    },
    {
      orgName: 'Organization 2',
      isAdmin: false,
      orgPicture: logoOrg2,
      projects: [
        { proName: 'Project Dumbo', proPicture: logoPro3, projectBackgroundPicture: fondoProyecto3,},
      ]
    }
  ]

  return (
    <div className='organizationsInterface'>
      <div className='organizationsContainer'>
        <div className='organizationsWrapper'>
          {organizations.map((organization, orgIndex) => (
            <div className='singleOrganizationContainer' key={orgIndex}>
              {showOverlay && <OverlayAddOrg setShowOverlay={setShowOverlay}/>}
              <div className={`singleOrganization ${(selectedOrgIndex === orgIndex) ? 'showBorder' : ''}`}>
                <img className='orgPicture' src={organization.orgPicture}/>
                <div className='orgNameAndOptions'>
                  <div className='orgNameAndAdmin'>
                    <h1 className='orgName'>{organization.orgName}</h1>
                    {organization.isAdmin && <h3 className='isAdmin'>Admin</h3>}
                  </div>
                  <div className='orgOptions'>
                    <div className='singleOption'>
                      <img className='optionsIcon' src={handshakeIcon}/>
                      <h3 className='optionsText'>Members</h3>
                    </div>
                    <div className='singleOption'>
                      <img className='optionsIcon' src={eyeIcon}/>
                      <h3 className='optionsText'>History</h3>
                    </div>
                    <div className='singleOption' onClick={() => handleShowProjects(orgIndex)}>
                      <img className='optionsIcon' src={eyeIcon}/>
                      <h3 className='optionsText'>Projects</h3>
                    </div>
                  </div>
                </div>
              </div>
              {(!showBelow && selectedOrgIndex === orgIndex) && 
              <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                {organization.projects.map((project, proIndex) => (
                  <div key={proIndex} className='singleProjectOrganization'>
                    <div className='backgroundSpace' style={{ backgroundImage: `url(${project.projectBackgroundPicture})`, borderRadius: '10px 10px 0 0' }}></div>
                    <h2 className='projectNameBack'>{project.proName}</h2>
                  </div>
                ))}
              </div>
              }
            </div>
          ))}
        </div>
      { (showBelow && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${showBelow ? 'showBorder' : ''}`}>
          {organizations[selectedOrgIndex].projects.map((project, proIndex) => (
            <div key={proIndex} className='singleProjectOrganization'>
              <div className='backgroundSpace' style={{ backgroundImage: `url(${project.projectBackgroundPicture})`, borderRadius: '10px 10px 0 0' }}></div>
              <h2 className='projectNameBack'>{project.proName}</h2>
            </div>
          ))}
        </div>
      }
    </div>
    <div className='buttonsOrganization'>
      <h3 className='botonRegister' onClick={() => setShowOverlay(true)}>
            + ADD ORGANIZATION
      </h3>
      <h3 className='botonRegister'>
            + JOIN ORGANIZATION
      </h3>
    </div>
   </div>
  );
}

export default MyOrganizations;