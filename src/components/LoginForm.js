import '../css/loginform.css';
import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useUserContext } from '../context/UserContext';
import loginAccount from '../hooks/loginAccount';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState(null);

  const { setUserID, setUsername, setUserEmail, setUserTags} = useUserContext();

  const navigate = useNavigate();

  const handleLoginAccount = async (e) => {
    e.preventDefault();
    try {
      const loginResult = await loginAccount(email, password);
      if (loginResult.userID) {

        setUserID(loginResult.userID);
        setUserEmail(loginResult.email);
        setUsername(loginResult.username);
        setUserTags(loginResult.userTags);
        
        navigate('/yourcapeer');
      
      }
    } catch (err) {
      setError(err.message);
    }
  }

  const handleShowRegister = (e) => {
    e.preventDefault();
    setShowRegister(!showRegister);
  }

  return (
    <div className='loginNRegisterContainer'>
      <div className={`loginSection ${showRegister ? 'opacityEffect' : ''}`}>
        <h1 className='loginTitle'>INICIAR SESIÓN</h1>
        {error && <div className="error-message" > {error} </div>}
        <form className='form' id='loginForm' onSubmit={handleLoginAccount}>
          <input type='email' placeholder='Email' className='inputForm' value={email} onChange={e => setEmail(e.target.value)} required/>
          <input type='password' placeholder='Password' className='inputForm' value={password} onChange={e => setPassword(e.target.value)} required/>
          <button className='botonRegister' id='formButton'>LOGIN</button>
        </form>
      </div>
      <div className='registerSection'>
        <h5 className='registerTitle'>¿AÚN NO TIENES CUENTA?</h5>
        <button className={`botonRegister ${showRegister ? 'opacityEffect' : ''}`} id='formButton' onClick={handleShowRegister}>REGISTER</button>
        {showRegister && <RegisterForm />}
      </div>
    </div>
  )
}

export default LoginForm;