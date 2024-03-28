// Este archivo es para crear y usar el contexto del LOGIN DEL USUARIO
// para poder usar esta información en toda la app sin andar llevando 
// los datos de un lado para otro

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userTags, setUserTags] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [memberAccounts, setMemberAccounts] = useState([]);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) setUserID(storedUserID);

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);

    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) setUserEmail(storedUserEmail);

    const storedUserTags = localStorage.getItem('userTags');
    if (storedUserTags) setUserTags(storedUserTags);

    const storedIsLogged = localStorage.getItem('isLogged');
    if (storedIsLogged) setIsLogged(storedIsLogged);

    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) setProfilePic(storedProfilePic);

    const storedMemberAccounts = localStorage.getItem('memberAccounts');
    if (storedMemberAccounts) setMemberAccounts(storedMemberAccounts);

  }, []);

  // Almacena los valores del contexto en el almacenamiento local cada vez que cambien
  useEffect(() => {
    localStorage.setItem('userID', userID);
    localStorage.setItem('username', username);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userTags', userTags);
    localStorage.setItem('isLogged', isLogged);
    localStorage.setItem('profilePic', profilePic);
    localStorage.setItem('memberAccounts', memberAccounts);
  }, [userID, username, userEmail, userTags, isLogged, profilePic, memberAccounts]);

  return (
    <UserContext.Provider value={{ userID, setUserID, username, setUsername, userEmail, setUserEmail,
      userTags, setUserTags, isLogged, setIsLogged, profilePic, setProfilePic, memberAccounts, setMemberAccounts}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);