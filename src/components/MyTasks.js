import chatLogo from '../img/chat-logo-white.png'
import { useState, useEffect } from 'react';
import '../css/mytasks.css';
import fondoProyecto1 from '../img/fondoProyecto1.jpeg';
import fondoProyecto2 from '../img/fondoProyecto2.jpeg';
import fondoProyecto3 from '../img/fondoProyecto3.jpeg';
import { useUserContext } from '../context/UserContext';
import { getOrganizations } from '../hooks/getOrganizations';
import { getProjectsByOrg } from '../hooks/getProjectsByOrg';
import { getTasksByPro } from '../hooks/getTasksByPro';
import { getProjectMembers } from '../hooks/getProjectMembers';
import OverlayTask from './OverlayTask';
import Alert from './Alert';

function MyTasks() {
  const [organizationsFilter, setOrganizationsFilter] = useState(null);
  const [organizationsWithData, setOrganizationsWithData] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stateFilter, setStateFilter] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [ projectMembers, setProjectMembers ] = useState([]);
  const [ showTaskOverlay, setShowTaskOverlay ] = useState(false);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [showAlert, setShowAlert] = useState({show: false, message: ''});
  const { userID, memberAccounts, activeMemberAccount, setActiveMemberAccount } = useUserContext();

  const [isAll, setIsAll] = useState(false);

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setShowTaskOverlay(true);
  }

  const handleCheckboxChange = (event) => {
    setIsAll(event.target.checked);
  };

  const handleOrgChange = async (event) => {
    setOrganizationsFilter(event.target.value);
  };

  const handleStateChange = async (event) => {
    setStateFilter(event.target.value);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const organizations = await getOrganizations(userID);   
        
        setOrganizations(organizations);
        
        let uniqueOrganizations = new Set();  

        let projectData = null;

        if (!isAll) {
          organizations.forEach(organization => {
            if (organization.member_account === activeMemberAccount) {
              uniqueOrganizations.add(organization);
            }
          });
        } else {
          organizations.forEach(organization => {
            uniqueOrganizations.add(organization);
          });
        }
        
        if (organizations) {

        let organizationsWithData = null;

        if (organizationsFilter) {
          let filteredOrg = null;

          uniqueOrganizations.forEach(organization => {
            if (organization.orgname === organizationsFilter) {
              filteredOrg = organization;
            }
          })

          const projects = await getProjectsByOrg(organizationsFilter); // Obtener los proyectos de la organización

          const uniqueProjects = projects.reduce((set, project) => {
            set.add(project.proname); // Usamos el nombre del proyecto como clave para la unicidad
            return set;
          }, new Set());
          
          const uniqueProjectsArray = Array.from(uniqueProjects, proname => {
            return projects.find(project => project.proname === proname);
          });
          
          setProjects(uniqueProjectsArray)
          
          projectData = await Promise.all(Array.from(uniqueProjectsArray).map(async (project) => {
              const projectMembers = await getProjectMembers(project.proname);
              const tasks = await getTasksByPro(project.proname);

              let filteredTasks;

              if (stateFilter) {
                filteredTasks = tasks.filter(task => task.task_state === stateFilter)
              } else {
                filteredTasks = tasks;
              }
            
              return {
                ...project,
                projectMembers,
                filteredTasks
              };
          }));

        const content = {
        ...filteredOrg,
        projects: projectData
        };

        organizationsWithData = [content];
          
        setOrganizationsWithData(organizationsWithData);
      }
          
      else {
              
        const promises = Array.from(uniqueOrganizations).map(async (organization) => {
          const projects = await getProjectsByOrg(organization.orgname); // Obtener los proyectos de la organización
          
          const uniqueProjects = projects.reduce((set, project) => {
            set.add(project.proname); // Usamos el nombre del proyecto como clave para la unicidad
            return set;
          }, new Set());
          
          const uniqueProjectsArray = Array.from(uniqueProjects, proname => {
            return projects.find(project => project.proname === proname);
          });

          projectData = await Promise.all(Array.from(uniqueProjectsArray).map(async (project) => {
            const projectMembers = await getProjectMembers(project.proname);
            const tasks = await getTasksByPro(project.proname);

            let filteredTasks;

            if (stateFilter) {
              filteredTasks = tasks.filter(task => task.task_state === stateFilter)
            } else {
              filteredTasks = tasks;
            }
          
            return {
              ...project,
              projectMembers,
              filteredTasks
            };
        }));
      
        return {
          ...organization,
          projects: projectData
        };
      });

      organizationsWithData = await Promise.all(promises);
      setOrganizationsWithData(organizationsWithData);
      }
 
      }

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();

  }, [isAll, organizationsFilter, stateFilter]);

  return (
    <div className='selProjectContainer'>
      <div style={{marginLeft: "270px", marginTop: "10px", marginBottom: "10px", display: 'flex'}}>
        <label class="switchBtn">
          <input type="checkbox" checked={isAll} onChange={handleCheckboxChange}/>
          <div class="slide">
            <span class="text off">All</span>
            <div class="knob"></div>
            <span class="text on">Active</span>
          </div>
          <span class="popup">All accounts / Active account only</span>
        </label>
        <select className='inputForm' id="select" list="organizations" placeholder='Organizations' onChange={handleOrgChange} required>
          {organizations.length > 0 ? (
            <>
              <option value="">Select organization </option>
              {organizations
                .map((organization, index) => (
                <option key={index} id='option' value={organization.orgname}>{organization.orgname}</option>
              ))}
            </>
          ) : (
            <option value="" disabled>No organizations available</option>
          )}
          </select>
          <select className='inputForm' id="select" list="projects" placeholder='Projects' onChange={handleStateChange} required>
              <option value="">Select state </option>
              <option id='option' value="To-Do">To-Do</option>
              <option id='option' value="IN PROGRESS">IN PROGRESS</option>
              <option id='option' value="COMPLETED">COMPLETED</option>
              <option id='option' value="CANCELLED">CANCELLED</option>
          </select>
      </div>
      {showAlert.show && <Alert message={showAlert.message}/>}
      {showTaskOverlay && <OverlayTask task={selectedTask} setShowTaskOverlay={setShowTaskOverlay} projectMembers={projectMembers} setShowAlert={setShowAlert}/>}
      <div className='myTasksContainer'>
      {organizationsWithData && organizationsWithData.map((organization, orgIndex) => (
        <div key={orgIndex}>
          {organization.projects.map((project, projectIndex) => (
            <div key={projectIndex} >
              {project.filteredTasks.map((task, taskIndex) => (
                <div key={taskIndex} className='singleTaskContainer'>
                  <div className='singleTask' onClick={() => handleSelectTask(task)}>
                    <h4 id='task-name'>{task.taskname}</h4>
                    <h5 id='task-desc'>{task.assigned_member_account}</h5>
                    <h6 style={{ color: 'green', background: 'lightgreen' }} id='task-status'>&nbsp;{task.task_state}&nbsp;</h6>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
        </div>
    </div>
  );
}

export default MyTasks;