import chatLogo from '../img/chat-logo-white.png'
import { useState, useEffect, useContext } from 'react';
import '../css/myproject.css';
import fondoProyecto1 from '../img/fondoProyecto1.jpeg';
import fondoProyecto2 from '../img/fondoProyecto2.jpeg';
import fondoProyecto3 from '../img/fondoProyecto3.jpeg';
import { useUserContext } from '../context/UserContext';
import { useMenuContext } from '../context/MenuContext';
import { getProjectMembers } from '../hooks/getProjectMembers';
import OverlayProAssignMember from './OverlayProAssignMember';
import OverlayAddTask from './OverlayAddTask';
import Alert from './Alert';
import { getTasksByPro } from '../hooks/getTasksByPro';

function MyProject() {
  const { selectedProject } = useMenuContext();
  const [ projectMembers, setProjectMembers ] = useState([]);
  const [ tasks, setTasks ] = useState([]);
  const [ showMemberProjectOverlay, setShowMemberProjectOverlay ] = useState(false)
  const [ showAddTaskOverlay, setShowAddTaskOverlay ] = useState(false);
  const [showAlert, setShowAlert] = useState({show: false, message: ''});

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
      return "SUPER REVIEWER";
    } else {
      return "MEMBER";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectMembers = await getProjectMembers(selectedProject.proname);
        const tasks = await getTasksByPro(selectedProject.proname);
        if (projectMembers) {
          setProjectMembers(projectMembers);
        }
        if (tasks) {
          setTasks(tasks);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();

    const handleResize = () => {
      //setShowAllComments(window.innerWidth > 1350);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showAddTaskOverlay, showMemberProjectOverlay]);

  return (
    <div className='selProjectContainer'>
        <div className='singleSelProjectContainer'>
        {showAlert.show && <Alert message={showAlert.message}/>}
        {showMemberProjectOverlay && <OverlayProAssignMember project={selectedProject} setShowMemberProjectOverlay={setShowMemberProjectOverlay} setShowAlert={setShowAlert}/>}
        {showAddTaskOverlay && <OverlayAddTask project={selectedProject} setShowAddTaskOverlay={setShowAddTaskOverlay} projectMembers={projectMembers} setShowAlert={setShowAlert}/>}
          <div className='selProject'>
            <div className='reviewProject' style={{ backgroundImage: `url(${fondoProyecto1})`, borderRadius: '10px 10px 0 0' }}>
              <h1 id='reviewProjectTitle'>{selectedProject.proname}</h1>
              <h1 id='addTask' onClick={() => setShowAddTaskOverlay(true)}>&nbsp;+&nbsp;</h1>
            </div>
            <div className='projectContainer'>
              <div className='projectSection'>
                <h4 id='projectTitle'>Organización: </h4>
                <h3 id='projectTitle'>{selectedProject.orgname}</h3>
              </div>
              <div className='projectSection'>
                <h4>Descripción: </h4>
                <h3 id='projectDesc'>{selectedProject.pro_desc} </h3>
              </div>
              <div className='projectSection'>
                <h4 id='projectDate'>Creado en:</h4>
                <h3 id='projectDate'>{new Date(selectedProject.pro_creation_date).toLocaleDateString()}</h3>
              </div>
              <div className='projectSection'>
                <h4 id='projectAccount'>Vinculado a:</h4>
                <h3 id='projectAccount'>{selectedProject.member_account}</h3>
              </div>
            </div>
          </div>
          <div className='selProjectMembers'>
            <h4 id='memberElementTitle'>Project members</h4>
            {projectMembers.map((member, memberIndex) => (
              <div key={memberIndex} className='singleMemberContainer'>
                <h4 id='memberElementName'>{member.member_account}</h4>
                <h5 id='memberElementRole'className={getRoleClassName(member)}>{getRoleLabel(member)}</h5>
              </div>
            ))}
            <h5 className='botonRegister' onClick={() => setShowMemberProjectOverlay(true)}>
                    + ASSIGN MEMBERS
            </h5>
          </div>
        </div>
        <div className='tasksContainer'>
          {tasks.map((task, taskIndex) => (
            <div className='singleTask' key={taskIndex}>
              <h2 id='task-name'>{task.taskname}</h2>
              <h3 id='task-desc'>{task.task_desc}</h3>
              <h5 style={{ color: 'green', background: 'lightgreen' }} id='task-status'>&nbsp;{task.task_state}&nbsp;</h5>
           </div>
          ))}
        </div>
    </div>
  );
}

export default MyProject;