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

function MyProject() {
  const { selectedProject } = useMenuContext();
  const [ projectMembers, setProjectMember ] = useState([]);
  const [ showMemberProjectOverlay, setShowMemberProjectOverlay ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectMembers = await getProjectMembers(selectedProject.proname);
        if (projectMembers) {
          setProjectMember(projectMembers);
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
  }, []);

  return (
    <div className='selProjectContainer'>
        <div className='singleSelProjectContainer'>
        {showMemberProjectOverlay && <OverlayProAssignMember project={selectedProject} setShowMemberProjectOverlay={setShowMemberProjectOverlay}/>}
          <div className='selProject'>
            <div className='reviewProject' style={{ backgroundImage: `url(${fondoProyecto1})`, borderRadius: '10px 10px 0 0' }}>
              <h1>{selectedProject.proname}</h1>
              <img className='chatLogo' src={fondoProyecto1}/>
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
                <h5 id='memberElementRole'>{member.is_admin ? "ADMIN" : member.is_reviewer ? "REVIEWER" : member.is_submitter ? "SUBMITTER" : "MEMBER"}</h5>
              </div>
            ))}
            <h5 className='botonRegister' onClick={() => setShowMemberProjectOverlay(true)}>
                    + ASSIGN MEMBERS
            </h5>
          </div>
        </div>
        <div className='tasksContainer'>
            <div className='singleTask'>
              <h2 id='task-name'>Tarea 1</h2>
              <h3 id='task-desc'>Mejorar el coverage de los tests</h3>
              <h5 style={{ color: 'green', background: 'lightgreen' }} id='task-status'>&nbsp;IN PROGRESS&nbsp;</h5>
            </div>
            <div className='singleTask'>
            <h2 id='task-name'>Tarea 2</h2>
              <h3 id='task-desc'>Arreglar los bugs de la interfaz de usuario y equipo</h3>
              <h5 style={{ color: 'green', background: 'lightgreen' }} id='task-status'>&nbsp;IN PROGRESS&nbsp;</h5>
            </div>
            <div className='singleTask'>
              <h2 id='task-name'>Tarea 1</h2>
              <h3 id='task-desc'>Mejorar el coverage de los tests</h3>
              <h5 style={{ color: 'green', background: 'lightgreen' }} id='task-status'>&nbsp;IN PROGRESS&nbsp;</h5>
            </div>
            <div className='singleTask'>
              <h2 id='task-name'>Tarea 1</h2>
              <h3 id='task-desc'>Mejorar el coverage de los tests</h3>
              <h5 style={{ color: 'green', background: 'lightgreen' }} id='task-status'>&nbsp;IN PROGRESS&nbsp;</h5>
            </div>
        </div>
    </div>
  );
}

export default MyProject;