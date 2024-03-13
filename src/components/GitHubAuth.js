import '../css/githubauth.css'

function GitHubAuth() {

  const client_id = process.env.REACT_APP_CLIENT_ID;

  return (
    <div className="authContainer"> 
    <h1>AQUÍ VA A IR LA MOVIDA DE LA AUTENTICACIÓN DE GITHUB. TE VA A REDIRIGIR A /yourcapeer</h1>
    <a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`}>Login with GitHub</a>
    </div>
  )
}

export default GitHubAuth;