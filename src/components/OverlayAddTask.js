import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { addProject } from '../hooks/addProject';
import { useUserContext } from '../context/UserContext';

const Overlay = ({project, setShowAddTaskOverlay, projectMembers}) => {
  const [error, setError] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const { userID, memberAccounts } = useUserContext();

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      //await addProject(orgName, taskName, taskDesc, chosenMemberAccount)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleMemberAccountChange = (e) => {
    //setChosenMemberAccount(e.target.value);
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={() => setShowAddTaskOverlay(false)} id='closeOverlayButton'>Cerrar</button>
        <h2 id='title'>Create new task</h2>
        <h3 id='title'>Assign members from <span style={{ color: 'orange' }}>{project.proname}</span></h3>
        <form id='form' onSubmit={handleAddProject}>
          <select className='inputForm' id="select" list="memberAccounts" placeholder='Members' onChange={handleMemberAccountChange} required>
          {projectMembers.length > 0 ? (
            <>
              <option value="">Assign a project member to task </option>
              {projectMembers.map((projectMember, index) => (
                <option key={index} id='option' value={projectMember.member_account}>{projectMember.member_account}</option>
              ))}
            </>
          ) : (
            <option value="" disabled>No GitHub accounts available</option>
          )}
          </select>
          <h4>Task name</h4>  
          <input type='text' placeholder='Name' className='inputForm' id='name' value={taskName} onChange={e => setTaskName(e.target.value)} required/>
          <h4>Task description </h4>
          <textarea placeholder='Description' className='inputForm' id='description' value={taskDesc} onChange={e => setTaskDesc(e.target.value)} required/>
          {error && <div className="error-message" id='errorText'>{error}</div>}
          <button className='botonRegister' id='createButton'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default Overlay;