import '../css/loginform.css';
import { useState } from 'react';
import registerAccount from '../hooks/registerAccount';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [tags, setTags] = useState([]);
  const [showNameNTags, setShowNameNTags] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);

  const handleRegisterAccount = async (e) => {
    e.preventDefault();
    try {
      await registerAccount(name, email, password, tags);
    } catch (error) {
      setError(error.message);
    } 
  }

  const handleShowNameNTags = (e) => {
    e.preventDefault();
    if (password === rePassword) {
      setShowNameNTags(!showNameNTags);
    } else {
      setErrorMessage('Las contraseñas no coinciden');
    return;
    }
  }

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Agrega un "#" al inicio
    if (value && value.charAt(0) !== '#') {
      value = '#' + value;
    }

    setInputValue(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newTag = e.target.value;
      setTags([...tags, newTag]);
    }
  };

  return (
    <div>
    {error && <div className="error-message" > {error} </div>}

    {!showNameNTags &&
    <form className='form' id='loginFormReg' onSubmit={handleShowNameNTags}>
      <input type='text' placeholder='Email' className='inputForm' value={email} onChange={e => setEmail(e.target.value)} required/>
      <input type='password' placeholder='Password' className='inputForm' value={password} onChange={e => setPassword(e.target.value)} required/>
      <input type='password' placeholder='Repeat password' className='inputForm' value={rePassword} onChange={e => setRePassword(e.target.value)} required/>
      <button className='botonRegister' id='formButton'>CONTINUAR</button>
      {errorMessage && <div className='error'>{errorMessage}</div>}
    </form> }
    {showNameNTags && 
      <form className='form' id='registerForm' onSubmit={handleRegisterAccount}>
        <div className='nameNTagsInput'>
          <input type='text' placeholder='Name' className='inputForm' id='usernameInput' value={name} onChange={e => setName(e.target.value)} required/>
          <div id='tagsDiv'>
            <input className='inputForm' id="tagsListInput" list="tags" placeholder='Tags' value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
            <datalist id="tags">
              <option value="#JavaScript"/>
              <option value="#Java"/>
              <option value="#MySQL"/>
              <option value="#Python"/> 
              <option value="#Photoshop"/>
            </datalist> 
            {tags.length > 0 && 
            <ul className='tagsEnteredList'>
              {tags.map((tag, index) => (
                <li key={index} className='tagsEntered'>{tag}</li>
              ))}
            </ul>
            }
          </div>
        </div>
        <button className='botonRegister' id='formButtonC'>CREAR CUENTA</button>
    </form>}

    </div>
  )
}

export default RegisterForm;