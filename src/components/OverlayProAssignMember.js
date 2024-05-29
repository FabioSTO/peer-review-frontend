import { useEffect, useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { useUserContext } from '../context/UserContext';
import { inviteMembers } from '../hooks/inviteMembers';
import { getMembersByOrg } from '../hooks/getMembersByOrg';
import { getProjectMembers } from '../hooks/getProjectMembers';
import { addProjectMembers } from '../hooks/addProjectMembers';

const Overlay = ({project, setShowMemberProjectOverlay, setShowAlert}) => {
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { userID } = useUserContext();
  
  const handleAssignProMember = async (e) => {
    e.preventDefault();
    try {
      const result = await addProjectMembers(project.proname, selectedMembers);
      setShowAlert({ show:true, message:"¡Usuario/s asignado/s con éxito!" });
      setTimeout(() => {
        setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
      }, 4000);
      setShowMemberProjectOverlay(false);
    } catch (error) {
      setError(error.message)
    }
  }

  const toggleMemberSelection = (member_account) => {
    const updatedSelection = [...selectedMembers];
    const index = updatedSelection.indexOf(member_account);
    if (index !== -1) {
      updatedSelection.splice(index, 1);
    } else {
      updatedSelection.push(member_account);
    }
    setSelectedMembers(updatedSelection);
  };

  useEffect(() => {
    const fetchData = async () => {
      const members = await getMembersByOrg(project.orgname);
      const projectMembers = await getProjectMembers(project.proname);
      if (members && projectMembers) {
        const nonProjectMembers = members.filter(member => {return !projectMembers.some(projectMember => projectMember.member_account === member.member_account);});
        setMembers(nonProjectMembers)
      }
    };

    fetchData();
  }, []);


  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={() => setShowMemberProjectOverlay(false)} id='closeOverlayButton'>Cerrar</button>
        <h2 id='title'>{project.proname}</h2>
        <h3 id='title'>Assign members from <span style={{ color: 'orange' }}>{project.orgname}</span></h3>
        <form id='form' onSubmit={handleAssignProMember}>
          {members.map((member, memberIndex) => (
              <div key={memberIndex} className='singleMemberContainer'>
                <h4 id='memberElementName'>{member.member_account}</h4>
                <h5 id='memberElementRole'>{member.is_owner ? "OWNER" : member.is_admin ? "ADMIN" : member.is_super_reviewer ? "SUPER REVIEWER" : "MEMBER"}</h5>
                <input id='add' type='checkbox' onChange={() => toggleMemberSelection(member.member_account)} checked={selectedMembers.includes(member.member_account)}></input>
              </div>
          ))}
          {error && <div className="error-message" id='errorText'>{error}</div>}
          <button className='botonRegister' id='createButton'>Assign members</button>
        </form>
      </div>
    </div>
  );
};

export default Overlay;