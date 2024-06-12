import { useState, useEffect } from 'react';
import overlaytask from '../css/overlaytask.css'
import { addTaskFollower } from '../hooks/addTaskFollower'
import { getTaskMembers } from '../hooks/getTaskMembers'
import { useUserContext } from '../context/UserContext';

const Overlay = ({task, setShowTaskOverlay, projectMembers, setShowAlert}) => {
  const [error, setError] = useState(null);
  const [taskName, setTaskName] = useState(task.taskname);
  const [taskDesc, setTaskDesc] = useState(task.task_desc);
  const [chosenMemberAccount, setChosenMemberAccount] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState("members");
  const [ taskMembers, setTaskMembers ] = useState([]);
  const [ taskState, setTaskState ] = useState(task.task_state);
  const taskStates = ['To-Do', 'IN PROGRESS', 'CANCELLED', 'COMPLETED'];
  const [ update, setUpdate ] = useState(false);
  const { userID, memberAccounts } = useUserContext();

  // Obtener clase CSS según el rol del miembro
  function getRoleClassName(member) {
    if (member.is_creator) {
      return 'ownerRole';
    } else if (member.is_assigned) {
      return 'adminRole';
    } else if (member.is_super_reviewer) {
      return 'superReviewerRole';
    } else {
      return 'memberRole';
    }
  }

  // Obtener texto del rol del miembro
  function getRoleLabel(member) {
    if (member.is_creator) {
      return "CREATOR";
    } else if (member.is_assigned) {
      return "ASSIGNED";
    } else if (member.is_super_reviewer) {
      return "SUPER REVIEWER";
    } else {
      return "FOLLOWER";
    }
  }

  const handleAddTaskFollower = async (e) => {
    e.preventDefault();
    try {
      await addTaskFollower( task.task_ID, chosenMemberAccount );
      setUpdate(prev => !prev);
      setShowAlert({ show:true, message:"¡Usuario añadido con éxito!" });
      setTimeout(() => {
        setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
      }, 4000);
    } catch (error) {
      setError(error.message)
    }
  }

  const handleMemberAccountChange = (e) => {
    setChosenMemberAccount(e.target.value);
  }

  const handleStateChange = (e) => {
    setTaskState(e.target.value);
  }

  const getOptionClassName = (option) => {
    return selectedOption === option ? 'taskOption selected' : 'taskOption';
  };

  useEffect(() => {
      const fetchData = async () => {
        try {
          const taskMembers = await getTaskMembers(task.task_ID);
          if (taskMembers) {
            setTaskMembers(taskMembers);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
  
      fetchData();
  }, [update]);

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={() => setShowTaskOverlay(false)} id='closeOverlayButton'>Cerrar</button>
        <div className='taskOptions'>
          <h2 id='taskOption' className={getOptionClassName("members")} onClick={() => setSelectedOption("members")}>Members</h2>
          <h2 id='taskOption' className={getOptionClassName("reviews")} onClick={() => setSelectedOption("reviews")}>Reviews</h2>
          <h2 id='taskOption' className={getOptionClassName("edit")} onClick={() => setSelectedOption("edit")}>Edit</h2>
        </div>

        {selectedOption === "members" && <div>
            <h3 id='title'>Members from <span style={{ color: 'orange' }}>{task.taskname}</span></h3>
            <div className='taskMembersContainer'>
              <div className='allTaskMemberContainer'>
                {taskMembers.map((taskMember, index) => (
                  <div key={index} className='singleTaskMemberContainer'>
                    <h4>{taskMember.member_account}</h4>
                    <h5 id='memberElementRole'className={getRoleClassName(taskMember)}>{getRoleLabel(taskMember)}</h5>
                    <h4>{new Date(taskMember.assign_date).toLocaleDateString()}</h4>
                  </div>
                ))}
              </div>
              <div id='taskForm'>
                <form onSubmit={handleAddTaskFollower}>
                  <select className='inputForm' id="select" list="memberAccounts" placeholder='Members' onChange={handleMemberAccountChange} required>
                  {projectMembers.length > 0 ? (
                    <>
                      <option value="">Assign a follower </option>
                      {projectMembers.filter(projectMember => {
                        const taskMemberAccounts = taskMembers.map(taskMember => taskMember.member_account);
                        return !taskMemberAccounts.includes(projectMember.member_account);
                        })
                        .map((projectMember, index) => (
                        <option key={index} id='option' value={projectMember.member_account}>{projectMember.member_account}</option>
                      ))}
                    </>
                  ) : (
                    <option value="" disabled>No GitHub accounts available</option>
                  )}
                  </select>
                  {error && <div className="error-message" id='errorText'>{error}</div>}
                  <button className='botonRegister' id='createButton'>Assign</button>
                </form>
              </div>
            </div>
          </div>}  
        
        {selectedOption === "reviews" && <div>
          <h3 id='title'>Create new submission in <span style={{ color: 'orange' }}>{task.taskname}</span></h3>
          <form id='form' onSubmit={handleAddTaskFollower}>
            <h4>Submission title</h4>
            <h4>Submission content link </h4>
            <h4>Tags</h4>
            {error && <div className="error-message" id='errorText'>{error}</div>}
            <button className='botonRegister' id='createButton'>Create</button>
          </form>
        </div>} 
        
        {selectedOption === "edit" && <div>
          <h3 id='title'>Assign members from <span style={{ color: 'orange' }}>{task.taskname}</span></h3>
          <form id='form' onSubmit={handleAddTaskFollower}>
            <h4>Task state</h4>  
            <select className='inputForm' id="select" list="taskStates" placeholder='taskStates' onChange={handleStateChange} required>
              <option id='option' value="">{task.task_state} </option>
              {taskStates
                .filter(state => state !== task.task_state)  // Filtrar opciones que no coinciden con task_state
                .map((state, index) => (
                  <option key={index} id='option' value={state}>{state}</option>
                ))
              }
            </select>
            <h4>Task name</h4>  
            <input type='text' placeholder='Name' className='inputForm' id='name' value={taskName} onChange={e => setTaskName(e.target.value)} required/>
            <h4>Task description </h4>
            <textarea placeholder='Description' className='inputForm' id='description' value={taskDesc} onChange={e => setTaskDesc(e.target.value)} required/>
            {error && <div className="error-message" id='errorText'>{error}</div>}
            <button className='botonRegister' id='createButton'>NO HICE NADA DE PUT</button>
          </form>
        </div>} 

      </div>
    </div>
  );
};

export default Overlay;