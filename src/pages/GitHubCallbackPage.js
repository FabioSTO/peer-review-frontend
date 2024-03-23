import BannerHome from "../components/BannerHome";
import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import githubAddAccount from '../hooks/githubAddAccount';
import { useLocation, useNavigate } from 'react-router-dom';
import GitHubAuth from "../components/GitHubAuth";
import { useMenuContext } from "../context/MenuContext";


function GitHubCallbackPage() {
  const location = useLocation();
  const { userID } = useUserContext();
  const { setErrorMessage, setProfileSidebarVisible } = useMenuContext();

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    userID && fetchData();

    async function fetchData() {
      try {
        const loginResult = await githubAddAccount(code, userID);
        if (loginResult.message) {
          setErrorMessage(loginResult.message);
          setProfileSidebarVisible(true)
        } 

        navigate('/yourcapeer')
        
      } catch (error) {
      }
      
    }
    
  }, [location.search, userID]);

  return (
    <div className='Loginpage'>
      <BannerHome />
      <GitHubAuth />
    </div>
  );
}

export default GitHubCallbackPage;