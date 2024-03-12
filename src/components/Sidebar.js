import { useState } from 'react';
import logoOrganizacion from '../img/logoOrganizacion.jpeg';
import logoOrg1 from '../img/paraprobar/denodo.jpg';
import logoOrg2 from '../img/paraprobar/si.png';
import logoPro1 from '../img/paraprobar/pueblos-bonitos-cantabria.webp';
import logoPro2 from '../img/paraprobar/macaco_azul.jpg';
import logoPro3 from '../img/paraprobar/Mono.jpg';
import logoPro4 from '../img/paraprobar/aroFuego.jpg';
import '../css/sidebar.css'

function Sidebar() {
  const [showMyOrganizations, setShowMyOrganizations] = useState(true)
  const [showMyProjects, setShowMyProjects] = useState([])

  const handleMyOrganizations = () => {setShowMyOrganizations(!showMyOrganizations)}
  
  const handleMyProjects = (orgIndex) => {
    setShowMyProjects(prevState => {
      const newState = [...prevState];
      newState[orgIndex] = !newState[orgIndex];
      return newState;
    })
  }

  const organizations = [
    {
      orgName: 'Organization 1',
      orgPicture: logoOrg1,
      projects: [
        { proName: 'Project 1', proPicture: logoPro1},
        { proName: 'Project 2', proPicture: logoPro2}
      ]
    },
    {
      orgName: 'Organization 2',
      orgPicture: logoOrg2,
      projects: [
        { proName: 'Project 1', proPicture: logoPro3},
        { proName: 'Project 2', proPicture: logoPro4}
      ]
    }
  ]

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
                <img className='logoSidebarOrg' src={organization.orgPicture}></img>
                <div className='sidebarSectionOrg'>{organization.orgName}</div>
              </li>
              { showMyProjects[orgIndex] && (
                <ul className='itemList'>
                  {organization.projects.map((project, proIndex) => 
                    <li className='sidebarPro' key={proIndex}>
                      <img className='logoSidebarPro' src={project.proPicture}></img>
                      <div className='sidebarSectionPro'>{project.proName}</div>
                    </li>
                  )}
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