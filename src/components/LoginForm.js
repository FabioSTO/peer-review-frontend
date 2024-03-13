import '../css/loginform.css';
import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [email, setEmailReg] = useState('');
  const [password, setPassword] = useState('');
  const [userTags, setUserTags] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = (e) => {
    e.preventDefault();
    setShowRegister(!showRegister);

  }

  return (
    <div className='loginNRegisterContainer'>
      <div className={`loginSection ${showRegister ? 'opacityEffect' : ''}`}>
        <h1 className='loginTitle'>INICIAR SESIÓN</h1>
        <form className='form' id='loginForm'>
          <input type='text' placeholder='Email' className='inputForm' value={email} onChange={e => setEmailReg(e.target.value)} required/>
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