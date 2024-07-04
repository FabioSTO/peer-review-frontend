import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import '../css/overlaynoaccount.css'
import { getMemberRoles } from '../hooks/getMemberRoles';
import { updateMemberRoles } from '../hooks/updateMemberRoles';

const OverlayChangeRoles = ({ setShowOverlayChangeRoles, setShowAlert, changeRolesUserOrg, isOrg }) => {
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isSuperReviewer, setIsSuperReviewer] = useState(null);
  const [isReviewer, setIsReviewer] = useState(null);
  const memberAccount = changeRolesUserOrg.memberAccount;
  const orgName = changeRolesUserOrg.orgName;

  const handleChangeRoles = async (e) => {
    try {
      let result = null;
      if (isOrg) {
        result = await updateMemberRoles(memberAccount, orgName, isOrg, isAdmin, isSuperReviewer);
      } else {
        result = await updateMemberRoles(memberAccount, orgName, isOrg, isAdmin, isReviewer);
      }
      setShowAlert({ show:true, message:"¡Roles guardados con éxito!" });
      setShowOverlayChangeRoles(false)
      setTimeout(() => {
        setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
      }, 4000);
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await getMemberRoles(memberAccount, orgName, isOrg);
        setIsOwner(roles.is_owner);
        setIsAdmin(roles.is_admin);
        setIsSuperReviewer(roles.is_super_reviewer);
        setIsReviewer(roles.is_reviewer);

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ width: "fit-content", height: "25vh" }}>
      <button onClick={() => setShowOverlayChangeRoles(false)} id='closeOverlayButton'>Cerrar</button>
        <div class="container">
          <h2 id='title'>Change {memberAccount} roles</h2>
          {isOrg && 
          <table>
            <thead>
              <tr>
                <th style={{ padding: '10px 20px' }} id='memberElementRole' className="ownerRole">Owner</th>
                <th style={{ padding: '10px 20px' }} id='memberElementRole' className="ownerRole">Admin</th>
                <th style={{ padding: '10px 20px' }} id='memberElementRole' className="ownerRole">Super Reviewer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" checked={isOwner} readOnly />
                </td>
                <td>
                  <input style={{ cursor: 'pointer'}} onClick={() => setIsAdmin(!isAdmin)} type="checkbox" checked={isAdmin} />
                </td>
                <td>
                  <input style={{ cursor: 'pointer'}} onClick={() => setIsSuperReviewer(!isSuperReviewer)} type="checkbox" checked={isSuperReviewer} />
                </td>
              </tr>
            </tbody>
          </table>}
          {!isOrg && 
          <table>
            <thead>
              <tr>
                <th style={{ padding: '10px 20px' }} id='memberElementRole' className="ownerRole">Admin</th>
                <th style={{ padding: '10px 20px' }} id='memberElementRole' className="ownerRole">Reviewer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input style={{ cursor: 'pointer'}} onClick={() => setIsAdmin(!isAdmin)} type="checkbox" checked={isAdmin} />
                </td>
                <td>
                  <input style={{ cursor: 'pointer'}} onClick={() => setIsReviewer(!isReviewer)} type="checkbox" checked={isReviewer} />
                </td>
              </tr>
            </tbody>
          </table>}
          <button onClick={handleChangeRoles} className='botonRegister' id='createButton'>Save roles</button>
          {error && <div className="error-message" id='errorText'>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default OverlayChangeRoles;