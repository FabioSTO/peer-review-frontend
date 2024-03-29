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
import { useUserContext } from '../context/UserContext';
import OverlayAddOrg from './OverlayAddOrg';
import OverlayAddPro from './OverlayAddPro';
import OverlayAddMember from './OverlayAddMember';
import OverlayInvitations from './OverlayInvitations';
import { getOrganizations } from '../hooks/getOrganizations';
import { getInvitations } from '../hooks/getInvitations';

function MyOrganizations() {

  const [selectedOrgIndex, setSelectedOrgIndex] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showBelow, setShowBelow] = useState(window.innerWidth > 1310);
  const [showOrgOverlay, setShowOrgOverlay] = useState(false);
  const [showProOverlay, setShowProOverlay] = useState(false);
  const [showMemberOverlay, setShowMemberOverlay] = useState(false);
  const [showInvOverlay, setShowInvOverlay] = useState(false);
  const { userID } = useUserContext();
  const [organizations, setOrganizations] = useState([]);
  const [invitations, setInvitations] = useState([]);


  const handleShowProjects = (orgIndex) => {
    setSelectedOrgIndex(prevIndex => {
      if (orgIndex === prevIndex) {
        return null;
      } 
      else if (prevIndex === null) {
        return orgIndex;
      } 
      else {
        setTimeout(() => setSelectedOrgIndex(null), 0);
        return orgIndex;
      }});
    setShowInfo(false)
    setShowMembers(false)
    setShowProjects(!showProjects)
  };

  const handleShowMembers = (orgIndex) => {
    setSelectedOrgIndex(prevIndex => {
      if (orgIndex === prevIndex) {
        return null;
      } 
      else if (prevIndex === null) {
        return orgIndex;
      } 
      else {
        setTimeout(() => setSelectedOrgIndex(null), 0);
        return orgIndex;
      }});
    setShowInfo(false)
    setShowProjects(false)
    setShowMembers(!showMembers)
  };

  const handleShowInfo = (orgIndex) => {
    setSelectedOrgIndex(prevIndex => {
      if (orgIndex === prevIndex) {
        return null;
      } 
      else if (prevIndex === null) {
        return orgIndex;
      } 
      else {
        setTimeout(() => setSelectedOrgIndex(null), 0);
        return orgIndex;
      }});
    setShowInfo(false)
    setShowMembers(false)
    setShowInfo(!showInfo)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizations = await getOrganizations(userID);
        if (organizations) {
          setOrganizations(organizations);
        }
        const invitations = await getInvitations(userID);
        if (invitations) {
          setInvitations(invitations);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();

    const handleResize = () => {
      setShowBelow(window.innerWidth > 1310);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userID]);


  // Datos de ejemplo para renderizar

  /*
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
  ] */

  return (
    <div className='organizationsInterface'>
      <div className='organizationsContainer'>
        <div className='organizationsWrapper'>
        {invitations && <h5 className='invitationsNotice' onClick={() => setShowInvOverlay(true)}>Tienes {invitations.length} invitaciones de organizaciones.</h5>}
        {showOrgOverlay && <OverlayAddOrg setShowOrgOverlay={setShowOrgOverlay}/>}
        {showProOverlay && <OverlayAddPro setShowProOverlay={setShowProOverlay}/>}
        {showMemberOverlay && <OverlayAddMember orgName={organizations[selectedOrgIndex].orgname} setShowMemberOverlay={setShowMemberOverlay}/>}
        {showInvOverlay && <OverlayInvitations invitations={invitations} setShowInvOverlay={setShowInvOverlay}/>}
          {organizations.map((organization, orgIndex) => (
            <div className='singleOrganizationContainer' key={orgIndex}>
              <div className={`singleOrganization ${(selectedOrgIndex === orgIndex) ? 'showBorder' : ''}`}>
                <img className='orgPicture' src={logoOrg1}/>
                <div className='orgNameAndOptions'>
                  <div className='orgNameAndAdmin'>
                    <h1 className='orgName'>{organization.orgname}</h1>
                    {organization.is_admin ? <h3 className='isAdmin'>Admin</h3> : null}
                    {organization.is_owner ? <h3 className='isAdmin'>Owner</h3> : null}
                    {organization.is_super_reviewer ? <h3 className='isAdmin'>Super Reviewer</h3> : null}
                  </div>
                  <div className='orgOptions'>
                    <div className='singleOption'>
                      <img className='optionsIcon' src={eyeIcon} onClick={() => handleShowInfo(orgIndex)}/>
                      <h3 className='optionsText'>Info</h3>
                    </div>
                    <div className='singleOption'>
                      <img className='optionsIcon' src={eyeIcon} onClick={() => handleShowProjects(orgIndex)}/>
                      <h3 className='optionsText'>Projects</h3>
                    </div>
                    <div className='singleOption'>
                      <img className='optionsIcon' src={handshakeIcon} onClick={() => handleShowMembers(orgIndex)}/>
                      <h3 className='optionsText'>Members</h3>
                    </div>
                  </div>
                </div>
              </div>
              {(!showBelow && showInfo && selectedOrgIndex === orgIndex) && 
                <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                  { <div className='infoContainer'>
                      <h4 id='fieldTitle'>Descripción:</h4> <h4 id='field'>{organization.org_desc}</h4>
                      <h4 id='fieldTitle'>Fecha de creación:</h4> <h4 id='field'>{organization.org_creation_date}</h4>
                      <h4 id='fieldTitle'>Cuenta vinculada:</h4> <h4 id='field'>{organization.member_account}</h4>
                      <h4 id='fieldTitle'>Join date:</h4> <h4 id='field'>{organization.join_date}</h4>
                      <h4 id='fieldTitle'>¿Organización activa?:</h4> <h4 id='field'>{organization.is_active}</h4>
                    </div>}
                </div>
              }
              {(!showBelow && showProjects && selectedOrgIndex === orgIndex) && 
                <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                  <h3 className='botonRegister' onClick={() => setShowProOverlay(true)}>
                    + ADD PROJECT
                  </h3>
                </div>
              }
              {(!showBelow && showMembers && selectedOrgIndex === orgIndex) && 
                <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                  <h3 className='botonRegister' onClick={() => setShowMemberOverlay(true)}>
                    + INVITE MEMBER
                  </h3>
                </div>
              }
            </div>
          ))}
        </div>
      {(showBelow && showInfo && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${showBelow ? 'showBorder' : ''}`}>
          { <div className='infoContainerBelow'>
          <h4 id='fieldTitle'>Descripción:</h4> <h4 id='field'>{organizations[selectedOrgIndex].org_desc}</h4>
          <h4 id='fieldTitle'>Fecha de creación:</h4> <h4 id='field'>{organizations[selectedOrgIndex].org_creation_date}</h4>
          <h4 id='fieldTitle'>Cuenta vinculada:</h4> <h4 id='field'>{organizations[selectedOrgIndex].member_account}</h4>
          <h4 id='fieldTitle'>Join date:</h4> <h4 id='field'>{organizations[selectedOrgIndex].join_date}</h4>
          <h4 id='fieldTitle'>¿Organización activa?:</h4> <h4 id='field'>{organizations[selectedOrgIndex].is_active}</h4>
          </div>}
        </div>
      }
      {(showBelow && showProjects && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${!showBelow ? 'showBorder' : ''}`}>
          <h3 className='botonRegister' onClick={() => setShowProOverlay(true)}>
            + ADD PROJECT
          </h3>
        </div>
      }
      {(showBelow && showMembers && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${!showBelow ? 'showBorder' : ''}`}>
          <h3 className='botonRegister' onClick={() => setShowMemberOverlay(true)}>
            + INVITE MEMBER
          </h3>
        </div>
      }
    </div>
    <div className='buttonsOrganization'>
      <h3 className='botonRegister' onClick={() => setShowOrgOverlay(true)}>
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

/*  
      {(!showBelow && showProjects && selectedOrgIndex === orgIndex) && 
              <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                {organization.projects.map((project, proIndex) => (
                  <div key={proIndex} className='singleProjectOrganization'>
                    <div className='backgroundSpace' style={{ backgroundImage: `url(${project.projectBackgroundPicture})`, borderRadius: '10px 10px 0 0' }}></div>
                    <h2 className='projectNameBack'>{project.proName}</h2>
                  </div>
                ))}
              </div>
              }
*/

/* 
  {(showBelow && showProjects && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${showBelow ? 'showBorder' : ''}`}>
          {organizations[selectedOrgIndex].projects.map((project, proIndex) => (
            <div key={proIndex} className='singleProjectOrganization'>
              <div className='backgroundSpace' style={{ backgroundImage: `url(${project.projectBackgroundPicture})`, borderRadius: '10px 10px 0 0' }}></div>
              <h2 className='projectNameBack'>{project.proName}</h2>
            </div>
          ))}
        </div>
      } 
*/


