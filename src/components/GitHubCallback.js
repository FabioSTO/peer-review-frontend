import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import githubAddAccount from '../hooks/githubAddAccount';

function GitHubCallback(props) {
  const { userID } = useUserContext();

  useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);
    const code = searchParams.get('code');

    async function fetchData() {
      const loginResult = await githubAddAccount(code, "userID");
      
    }

    fetchData();

  }, [props.location.search]);

  return (
    <div>
      <h1 className='title'>Procesando...</h1>
    </div>
  );
}

export default GitHubCallback;