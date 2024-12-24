import '../css/loginform.css';
import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useUserContext } from '../context/UserContext';
import loginAccount from '../hooks/loginAccount';
import { useNavigate } from 'react-router-dom';
import { getMemberData } from '../hooks/getMemberData';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState(null);

  const { setUserID, setUsername, setUserEmail, setUserTags, setMemberAccounts} = useUserContext();

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

        const data = await getMemberData(loginResult.userID);
        if (data) {
          setMemberAccounts(data);
        }
        
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
      <section className={`loginSection ${showRegister ? 'opacityEffect' : ''}`}>
        <h1 className='loginTitle'>INICIAR SESIÓN</h1>
        {error && <div className="error-message" > {error} </div>}
        <form className='form' id='loginForm' onSubmit={handleLoginAccount}>
          <input type='email' placeholder='Email' className='inputForm' value={email} onChange={e => setEmail(e.target.value)} required/>
          <input type='password' placeholder='Password' className='inputForm' value={password} onChange={e => setPassword(e.target.value)} required/>
          <button className='botonRegister' id='formButton'>LOGIN</button>
        </form>
      </section>
      <section className='registerSection'>
        <div>
          <h5 className='registerTitle'>¿AÚN NO TIENES CUENTA?</h5>
          <button className={`botonRegister ${showRegister ? 'opacityEffect' : ''}`} id='formButton' onClick={handleShowRegister}>REGISTER</button>
        </div>
        {showRegister && <RegisterForm />}
      </section>
    </div>
  )
}

export default LoginForm;