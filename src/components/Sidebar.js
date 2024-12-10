import { useEffect, useState } from 'react';
import logoOrganizacion from '../img/logoOrganizacion.jpeg';
import logoOrg1 from '../img/paraprobar/denodo.jpg';
import logoOrg2 from '../img/paraprobar/si.png';
import logoOrg3 from '../img/paraprobar/reacticon.png';
import logoOrg4 from '../img/paraprobar/CasaTela2.jpeg';
import logoPro1 from '../img/paraprobar/pueblos-bonitos-cantabria.webp';
import logoPro2 from '../img/paraprobar/macaco_azul.jpg';
import logoPro3 from '../img/paraprobar/Mono.jpg';
import logoPro4 from '../img/paraprobar/aroFuego.jpg';
import '../css/sidebar.css'
import { getOrganizations } from '../hooks/getOrganizations';
import { getProjectsByOrg } from '../hooks/getProjectsByOrg';
import { useUserContext } from '../context/UserContext';
import { useMenuContext } from '../context/MenuContext';

function Sidebar() {
  const [showMyOrganizations, setShowMyOrganizations] = useState(true)
  const [showMyProjects, setShowMyProjects] = useState([])
  const { userID } = useUserContext();
  const { selectedTopMenu, setSelectedProject, setTopSelectedMenu} = useMenuContext();
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);

  const organizationLogos = [logoOrg1, logoOrg2, logoOrg3, logoOrg4];
  const projectLogos = [logoPro1, logoPro2, logoPro3, logoPro4];

  const handleMyOrganizations = () => {setShowMyOrganizations(!showMyOrganizations)}
  
  const handleMyProjects = (orgIndex) => {
    setShowMyProjects(prevState => {
      const newState = [...prevState];
      newState[orgIndex] = !newState[orgIndex];
      return newState;
    })
  }

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const organizations = await getOrganizations(userID);         
          
        if (organizations) {
          const uniqueOrganizations = organizations.reduce((acc, current) => {
            if (!acc.some(org => org.orgname === current.orgname)) {
              acc.push(current);
            }
            return acc;
          }, []);
      
          // Actualiza el estado con organizaciones únicas
          setOrganizations(uniqueOrganizations);
          
          const promises = organizations.map(async (organization) => {
            const projects = await getProjectsByOrg(organization.orgname); // Obtener los proyectos de la organización
            const uniqueProjectsMap = new Map();

            projects.forEach(pro => {
              uniqueProjectsMap.set(pro.proname, pro);
            });

            const uniqueProjects = Array.from(uniqueProjectsMap.values());
            return { projects: uniqueProjects };
          });
        
          Promise.all(promises)
          .then((data) => {
            const allProjects = data.flatMap(item => item.projects); // Combino el array de arrays de proyectos

            const uniqueProjects = allProjects.reduce((acc, current) => {
              if (!acc.some(pro => pro.proname === current.proname)) {
                acc.push(current);
              }
              return acc;
            }, []);

            setProjects(uniqueProjects);
          })
          .catch((error) => {
            console.error('Error al obtener proyectos:', error);
          });
        }

      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchData();

  }, [selectedTopMenu]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setTopSelectedMenu('project')
  }

  return (
    <div className="sidebar">
      <div className='fill'></div>
      <div className='sidebarOption' onClick={handleMyOrganizations}>
        <img className='logoSidebar' src={logoOrganizacion}></img>
        <div className='sidebarSection'>My organizations</div>
      </div>
      { showMyOrganizations && (
        <ul className='itemList'>
          {organizations.map((organization, orgIndex) => (
            <div className='pepe' key={orgIndex}>
              <li className='sidebarOrg'  onClick={() => handleMyProjects(orgIndex)}>
                <img className='logoSidebarOrg' src={organizationLogos[orgIndex % organizationLogos.length]}></img>
                <div className='sidebarSectionOrg'>{organization.orgname}</div>
              </li>
              { showMyProjects[orgIndex] && ( 
                <ul className='itemList'>
                  {projects.map((project, proIndex) => (project.orgname === organization.orgname && (
                    <li className='sidebarPro' key={proIndex} onClick={() => handleSelectProject(project)}>
                      <img className='logoSidebarPro' src={projectLogos[proIndex % projectLogos.length]}></img>
                      <div className='sidebarSectionPro'>{project.proname}</div>
                    </li>
                  )))}
                </ul>
              )}
            </div>
          ))}
        </ul>
        )
      }
    </div>
  )
}

export default Sidebar;

/*
return (
    <div className="sidebar">
      <div id='fill'></div>
      <div className='sidebarOption' onClick={handleMyOrganizations}>
        <img className='logoSidebar' src={logoOrganizacion}></img>
        <div className='sidebarSection'>My organizations</div>
      </div>
      { showMyOrganizations && 
      <ul className='itemList' onClick={handleMyProjects}>
        <li className='sidebarOrg'>
          <img className='logoSidebarOrg' src={logoOrg1}></img>
          <div className='sidebarSectionOrg'>Organization 1</div>
        </li>
        { showMyProjects && 
          <ul className='itemList'>
            <li className='sidebarPro'>
              <img className='logoSidebarPro' src={logoPro1}></img>
              <div className='sidebarSectionPro'>Proyecto 1</div>
            </li>
            <li className='sidebarPro'>
              <img className='logoSidebarPro' src={logoPro2}></img>
              <div className='sidebarSectionPro'>Proyecto 2</div>
            </li>
          </ul>
        }
        <li className='sidebarOrg'>
          <img className='logoSidebarOrg' src={logoOrg2}></img>
          <div className='sidebarSectionOrg'>Organization 2</div>
        </li>
        { showMyProjects && 
          <ul className='itemList'>
            <li className='sidebarPro'>
              <img className='logoSidebarPro' src={logoPro3}></img>
              <div className='sidebarSectionPro'>Proyecto 1</div>
            </li>
            <li className='sidebarPro'>
              <img className='logoSidebarPro' src={logoPro4}></img>
              <div className='sidebarSectionPro'>Proyecto 2</div>
            </li>
          </ul>
        }
      </ul>
      }
    </div>
  )
}
*/