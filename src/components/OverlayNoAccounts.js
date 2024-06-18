import { useState } from 'react';
import overlayaddorg from '../css/overlayaddorg.css'
import { addOrganization } from '../hooks/addOrganization';
import { useUserContext } from '../context/UserContext';
import { useMenuContext } from '../context/MenuContext';
import '../css/overlaynoaccount.css'

const OverlayNoAccount = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;

  const loginUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`;

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ width: "fit-content", height: "25vh" }}>
        <div class="container">
          <h2 id='title'>You need a GitHub account to use Capeer</h2>
          <a href={loginUrl} class="github-btn"  style={{ marginTop: "30px" }}>
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" class="github-logo"/>
              Sign in with GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default OverlayNoAccount;