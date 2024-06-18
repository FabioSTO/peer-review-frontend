import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { addOrganization } from '../hooks/addOrganization';
import { useUserContext } from '../context/UserContext';
import { useMenuContext } from '../context/MenuContext';
import '../css/overlaynoaccount.css'

const OverlayChooseAccount = ({ setShowOverlayChooseAccount }) => {

  const { memberAccounts, setActiveMemberAccount } = useUserContext();

  const selectActiveMemberAccount = (index) => {
    setActiveMemberAccount(memberAccounts[index].member_account);
    setShowOverlayChooseAccount(false);
  };

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ width: "fit-content", height: "25vh" }}>
        <div class="container">
          <h2 id='title'>Choose a GitHub account</h2>
          <ul className='gitAccountList'>
          {memberAccounts && (memberAccounts.length > 1) && memberAccounts.map((memberAccount, index) => ( 
            <li style={{ marginBottom: '20px', marginTop: '20px', outline: 'solid 2px rgb(106, 154, 180)' }} key={index} onClick={() => selectActiveMemberAccount(index)} id='gitAccount'>
              {memberAccount.member_account}
            </li>))}
          </ul>
          <h5 style={{ color: 'orange' }}>You can switch accounts anytime in the sidebar.</h5>
        </div>
      </div>
    </div>
  );
};

export default OverlayChooseAccount;