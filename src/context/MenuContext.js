// Contexto del menu de la interfaz principal

import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({children}) => {
  const [selectedTopMenu, setTopSelectedMenu] = useState(null);
  const [profileSidebarVisible, setProfileSidebarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <MenuContext.Provider value={{ selectedTopMenu, setTopSelectedMenu , profileSidebarVisible, setProfileSidebarVisible, errorMessage, setErrorMessage, selectedProject, setSelectedProject}}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => useContext(MenuContext)