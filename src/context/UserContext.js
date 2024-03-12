// Este archivo es para crear y usar el contexto del LOGIN DEL USUARIO
// para poder usar esta información en toda la app sin andar llevando 
// los datos de un lado para otro

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [voted, setVoted] = useState(false);

  return (
    <UserContext.Provider value={{ id, setId, username, setUsername, isLogged, setIsLogged, 
    profilePic, setProfilePic, email, setEmail, submitted, setSubmitted, voted, setVoted}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);