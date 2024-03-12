import BannerHome from "../components/BannerHome";
import GitHubAuth from "../components/GitHubAuth";

function LoginPage() {

  return (
    <div className='Loginpage'>
      <BannerHome />
      <GitHubAuth />
    </div>
  );
}

export default LoginPage;