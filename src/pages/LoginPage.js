import BannerHome from "../components/BannerHome";
import GitHubAuth from "../components/GitHubAuth";
import LoginForm from "../components/LoginForm";

function LoginPage() {

  return (
    <div className='Loginpage'>
      <BannerHome />
      <LoginForm />
    </div>
  );
}

export default LoginPage;

// <GitHubAuth />    // Esto es para logearse con Github y autorizar la app y eso