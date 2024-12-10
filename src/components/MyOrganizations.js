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
import { useMenuContext } from '../context/MenuContext';
import OverlayAddOrg from './OverlayAddOrg';
import OverlayAddPro from './OverlayAddPro';
import OverlayAddMember from './OverlayAddMember';
import OverlayInvitations from './OverlayInvitations';
import Alert from './Alert';
import { getOrganizations } from '../hooks/getOrganizations';
import { getInvitations } from '../hooks/getInvitations';
import { getMembersByOrg } from '../hooks/getMembersByOrg';
import { getProjectsByOrg } from '../hooks/getProjectsByOrg';
import OverlayChangeRoles from './OverlayChangeRoles';

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
  const [showOverlayChangeRoles, setShowOverlayChangeRoles] = useState(false);
  const [changeRolesUserOrg, setChangeRolesUserOrg] = useState({ memberAccount: '', orgName: '' });
  const { userID, memberAccounts, activeMemberAccount, setActiveMemberAccount } = useUserContext();
  const { setSelectedProject, setTopSelectedMenu } = useMenuContext();
  const [organizations, setOrganizations] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showAlert, setShowAlert] = useState({show: false, message: ''});
  const [isAll, setIsAll] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAll(event.target.checked);
  };

  const handleOverlayChangeRoles = (member) => {
    setShowOverlayChangeRoles(true);
    setChangeRolesUserOrg({ memberAccount: member.member_account, orgName: member.orgname });
  };

  const fondoProyectos = [ // Para poner fondos aleatorios chulos
    fondoProyecto3,
    fondoProyecto2,
    fondoProyecto3,
    fondoProyecto4
  ];

  const logoOrgs = [ // Para poner logos aleatorios chulos
    fondoProyecto1,
    fondoProyecto2,
    fondoProyecto3,
    logoPro4
  ];

  const handleShowProjects = (orgIndex) => {
    setShowInfo(false)
    setShowMembers(false)
    if (orgIndex !== selectedOrgIndex && showProjects === true) {
    } else {
      setShowProjects(prevState => !prevState);
    }
    setSelectedOrgIndex(prevIndex => {
      if (orgIndex === prevIndex && showProjects === true) {
        return null;
      } 
      else if (prevIndex === null) {
        return orgIndex;
      } 
      else {
        return orgIndex;
      }});
  };

  const handleShowMembers = (orgIndex) => {
    setShowInfo(false)
    setShowProjects(false)
    if (orgIndex !== selectedOrgIndex && showMembers === true) {
    } else {
      setShowMembers(prevState => !prevState);
    }
    setSelectedOrgIndex(prevIndex => {
      if (orgIndex === prevIndex && showMembers === true) {
        return null;
      } 
      else if (prevIndex === null) {
        return orgIndex;
      } 
      else {
        return orgIndex;
      }});
  };

  const handleShowInfo = (orgIndex) => {
    setShowProjects(false)
    setShowMembers(false)
    if (orgIndex !== selectedOrgIndex && showInfo === true) {
    } else {
      setShowInfo(prevState => !prevState);
    }
    setSelectedOrgIndex(prevIndex => {
      if (orgIndex === prevIndex && showInfo === true) {
        return null;
      } 
      else if (prevIndex === null) {
        return orgIndex;
      } 
      else {
        return orgIndex;
      }});
  };

  // Obtener clase CSS según el rol del miembro
  function getRoleClassName(member) {
    if (member.is_owner) {
      return 'ownerRole';
    } else if (member.is_admin) {
      return 'adminRole';
    } else if (member.is_super_reviewer) {
      return 'superReviewerRole';
    } else {
      return 'memberRole';
    }
  }

  // Obtener texto del rol del miembro
  function getRoleLabel(member) {
    if (member.is_owner) {
      return "OWNER";
    } else if (member.is_admin) {
      return "ADMIN";
    } else if (member.is_super_reviewer) {
      return "SUPER";
    } else {
      return "MEMBER";
    }
  }

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setTopSelectedMenu('project')
  }

  useEffect(() => {
    if (!showOrgOverlay) {
      const fetchData = async () => {
        try {
          const organizations = await getOrganizations(userID);         
            
          if (organizations) {
            if (!isAll) {
              const memberOrganizations = organizations.filter(organization => {
                return organization.member_account === activeMemberAccount;
              })
              setOrganizations(memberOrganizations);
            } else {
              setOrganizations(organizations);
            }
            
            const promises = organizations.map(async (organization) => {
              const members = await getMembersByOrg(organization.orgname); // Obtener los miembros de la organización
              const projects = await getProjectsByOrg(organization.orgname); // Obtener los proyectos de la organización
              const membersWithOrgName = members.map(member => ({ ...member, orgname: organization.orgname }));
              return { members: membersWithOrgName, projects: projects };
            });
          
            Promise.all(promises)
            .then((data) => {
              const allMembers = data.flatMap(item => item.members); // Combino el array de arrays
              setMembers(allMembers);
              const allProjects = data.flatMap(item => item.projects); // Combino el array de arrays de proyectos
              console.log(allProjects)
              setProjects(allProjects);
            })
            .catch((error) => {
              console.error('Error al obtener miembros:', error);
            });
          }
          const invitations = await getInvitations(userID);
          if (invitations) {
            setInvitations(invitations);
          }
        } catch (error) {
          console.error(error.message);
        }
      };

      if (memberAccounts && memberAccounts.length == 1) {
        setActiveMemberAccount(memberAccounts[0].member_account);
      }
  
      fetchData();
  
      const handleResize = () => {
        setShowBelow(window.innerWidth > 1310);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [userID, showOrgOverlay, showProOverlay, showMemberOverlay, showInvOverlay, showOverlayChangeRoles, activeMemberAccount, isAll]);


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
        {showAlert.show && <Alert message={showAlert.message}/>}
        <div className='invAndFilter'>
          {invitations && <h5 className='invitationsNotice' onClick={() => setShowInvOverlay(true)}>Tienes {invitations.length} invitaciones de organizaciones. </h5>} 
          <label class="switchBtn">
            <input type="checkbox" checked={isAll} onChange={handleCheckboxChange}/>
            <div class="slide">
              <span class="text off">All</span>
              <div class="knob"></div>
              <span class="text on">Active</span>
            </div>
            <span class="popup">All accounts / Active account only</span>
          </label>
        </div>
        {showOrgOverlay && <OverlayAddOrg setShowOrgOverlay={setShowOrgOverlay} setShowAlert={setShowAlert}/>}
        {showProOverlay && <OverlayAddPro setShowProOverlay={setShowProOverlay} orgMembers={members.filter(member => member.orgname === organizations[selectedOrgIndex].orgname && (member.is_admin || member.is_owner))} orgName={organizations[selectedOrgIndex].orgname} setShowAlert={setShowAlert}/>}
        {showMemberOverlay && <OverlayAddMember orgName={organizations[selectedOrgIndex].orgname} setShowMemberOverlay={setShowMemberOverlay} setShowAlert={setShowAlert}/>}
        {showInvOverlay && <OverlayInvitations invitations={invitations} setShowInvOverlay={setShowInvOverlay} setShowAlert={setShowAlert}/>}
        {showOverlayChangeRoles && <OverlayChangeRoles setShowOverlayChangeRoles={setShowOverlayChangeRoles} setShowAlert={setShowAlert} changeRolesUserOrg={changeRolesUserOrg} isOrg={true}/>}
          {organizations.map((organization, orgIndex) => (
            <div className='singleOrganizationContainer' key={orgIndex}>
              <div className={`singleOrganization ${(selectedOrgIndex === orgIndex) ? 'showBorder' : ''}`}>
                <img className='orgPicture' src={logoOrgs[orgIndex % logoOrgs.length]}/>
                <div className='orgNameAndOptions'>
                  <div className='orgNameAndAdmin'>
                    <h1 className='orgName'>{organization.orgname}</h1>
                    {organization.is_admin ? <h3 className='isAdmin'>Admin</h3> : null}
                    {organization.is_owner ? <h3 className='isAdmin'>Owner</h3> : null}
                    {organization.is_super_reviewer ? <h3 className='isAdmin'>Super Reviewer</h3> : null}
                  </div>
                  <div className='orgOptions'>
                    <div className='singleOption' onClick={() => handleShowInfo(orgIndex)}>
                      <img className='optionsIcon' src={eyeIcon}/>
                      <h3 className='optionsText'>Info</h3>
                    </div>
                    <div className='singleOption' onClick={() => handleShowProjects(orgIndex)}>
                      <img className='optionsIcon' src={eyeIcon}/>
                      <h3 className='optionsText'>Projects</h3>
                    </div>
                    <div className='singleOption' onClick={() => handleShowMembers(orgIndex)}>
                      <img className='optionsIcon' src={handshakeIcon}/>
                      <h3 className='optionsText'>Members</h3>
                    </div>
                  </div>
                </div>
              </div>
              {(!showBelow && showInfo && selectedOrgIndex === orgIndex) && 
                <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                  { <div className='infoContainer'>
                      <h4 id='fieldTitle'>Descripción:</h4> <h4 id='field'>{organization.org_desc}</h4>
                      <h4 id='fieldTitle'>Fecha de creación:</h4> <h4 id='field'>{new Date(organization.org_creation_date).toLocaleDateString()}</h4>
                      <h4 id='fieldTitle'>Cuenta vinculada:</h4> <h4 id='field'>{organization.member_account}</h4>
                      <h4 id='fieldTitle'>Join date:</h4> <h4 id='field'>{new Date(organization.join_date).toLocaleDateString()}</h4>
                      <h4 id='fieldTitle'>¿Organización activa?:</h4> <h4 id='field'>{organization.is_active ? "Active" : "Inactive"}</h4>
                    </div>}
                </div>
              }
              {(!showBelow && showProjects && selectedOrgIndex === orgIndex) && 
                <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                  {projects.map((project, proIndex) => (
                    memberAccounts.some(member => member.member_account === project.member_account) && project.orgname === organization.orgname && (
                  <div key={proIndex} className='singleProjectOrganization' onClick={() => handleSelectProject(project)}>
                    <div className='backgroundSpace' style={{ backgroundImage: `url(${fondoProyectos[proIndex % fondoProyectos.length]})`, borderRadius: '10px 10px 0 0' }}></div>
                    <h2 className='projectNameBack'>{project.proname}</h2>
                  </div>
                    )
                  ))}
                  {organization.is_admin || organization.is_owner ?  
                    <h3 className='botonRegister' onClick={() => setShowProOverlay(true)}>
                      + ADD PROJECT
                    </h3>
                    : <h4 className='orgName' style={{ color: 'orange'}}>No tienes permisos para añadir proyectos.</h4>
                  }
                </div>
              }
              {(!showBelow && showMembers && selectedOrgIndex === orgIndex) && 
                <div className={`projectsOrganization ${!showBelow ? 'showBorder' : ''}`}>
                  <div className='membersContainer'>
                    <div className='singleMemberContainerTitle'>
                      <h4 id='memberElement'>Member</h4>
                      <h4 id='memberElement'>Join date</h4>
                      <h5 id='memberElement'>Role</h5>
                    </div>
                    {members.map((member, memberIndex) => (
                      member.orgname === organization.orgname && (
                        <div key={memberIndex} className='singleMemberContainer'>
                          <h4 id='memberElementName'>{member.member_account}</h4>
                          <h4 id='memberElementDate'>{new Date(member.join_date).toLocaleDateString()}</h4>
                          <h5 id='memberElementRole' className={getRoleClassName(member)} onClick={() => handleOverlayChangeRoles(member)}>{getRoleLabel(member)} {((organization.is_admin && getRoleLabel(member) !== "OWNER") || organization.is_owner) ? <span className='plus-circle'>+</span>: <></>}</h5>
                        </div>
                      )
                    ))}
                  </div>
                  {organization.is_admin || organization.is_owner ?  
                    <h3 className='botonRegister' onClick={() => setShowMemberOverlay(true)}>
                    + INVITE MEMBER
                  </h3>
                    : <h4 className='orgName' style={{ color: 'orange'}}>No tienes permisos para invitar miembros.</h4>
                  }
                  
                </div>
              }
            </div>
          ))}
        </div>
      {(showBelow && showInfo && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${showBelow ? 'showBorder' : ''}`}>
          {<div className='infoContainerBelow'>
            <h4 id='fieldTitle'>Descripción:</h4> <h4 id='field'>{organizations[selectedOrgIndex].org_desc}</h4>
            <h4 id='fieldTitle'>Fecha de creación:</h4> <h4 id='field'>{new Date(organizations[selectedOrgIndex].org_creation_date).toLocaleDateString()}</h4>
            <h4 id='fieldTitle'>Cuenta vinculada:</h4> <h4 id='field'>{organizations[selectedOrgIndex].member_account}</h4>
            <h4 id='fieldTitle'>Join date:</h4> <h4 id='field'>{new Date(organizations[selectedOrgIndex].join_date).toLocaleDateString()}</h4>
            <h4 id='fieldTitle'>¿Organización activa?:</h4> <h4 id='field'>{organizations[selectedOrgIndex].is_active ? "Active" : "Inactive"}</h4>
          </div>}
        </div>
      }
      {(showBelow && showProjects && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${!showBelow ? 'showBorder' : ''}`}>
          {projects.map((project, proIndex) => (
            memberAccounts.some(member => member.member_account === project.member_account) && project.orgname === organizations[selectedOrgIndex].orgname && (
              <div key={proIndex} className='singleProjectOrganization' onClick={() => handleSelectProject(project)}>
                <div className='backgroundSpace' style={{ backgroundImage: `url(${fondoProyectos[proIndex % fondoProyectos.length]})`, borderRadius: '10px 10px 0 0' }}></div>
                <h2 className='projectNameBack'>{project.proname}</h2>
              </div>
            )
          ))}
          {organizations[selectedOrgIndex].is_admin || organizations[selectedOrgIndex].is_owner ?  
            <h3 className='botonRegister' id='botonRegisterRight' onClick={() => setShowProOverlay(true)}>
              + ADD PROJECT
            </h3>
            : <h4 className='orgName' style={{ color: 'orange'}}>No tienes permisos para añadir proyectos.</h4>
          }
        </div>
      }
      {(showBelow && showMembers && selectedOrgIndex !== null) && 
        <div className={`projectsOrganizationRight ${!showBelow ? 'showBorder' : ''}`}>
          <div className='membersContainer'>
              <div className='singleMemberContainerTitle'>
                <h4 id='memberElement'>Member</h4>
                <h4 id='memberElement'>Join date</h4>
                <h5 id='memberElement'>Role</h5>
              </div>
              {members.map((member, memberIndex) => (
                member.orgname === organizations[selectedOrgIndex].orgname && (
                  <div key={memberIndex} className='singleMemberContainer'>
                    <h4 id='memberElementName'>{member.member_account}</h4>
                    <h4 id='memberElementDate'>{new Date(member.join_date).toLocaleDateString()}</h4>
                    <h5 id='memberElementRole' className={getRoleClassName(member)} onClick={() => handleOverlayChangeRoles(member)}>{getRoleLabel(member)} {((organizations[selectedOrgIndex].is_admin && getRoleLabel(member) !== "OWNER") || organizations[selectedOrgIndex].is_owner) ? <span className='plus-circle'>+</span>: <></>}</h5>
                  </div>
                )
              ))}
            </div>
            {organizations[selectedOrgIndex].is_admin || organizations[selectedOrgIndex].is_owner ?  
            <h3 className='botonRegister' id='botonRegisterRightInv' onClick={() => setShowMemberOverlay(true)}>
            + INVITE MEMBER
            </h3>
            : <h4 className='orgName' style={{ color: 'orange'}}>No tienes permisos para invitar miembros.</h4>
          }
        </div>
      }
    </div>
    <div className='buttonsOrganization'>
      <h3 className='botonRegister' onClick={() => setShowOrgOverlay(true)}>
            + ADD ORGANIZATION
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


