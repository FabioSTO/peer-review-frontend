// Contexto del menu de la interfaz principal

import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({children}) => {
  const [selectedTopMenu, setTopSelectedMenu] = useState(null)

  return (
    <MenuContext.Provider value={{ selectedTopMenu, setTopSelectedMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => useContext(MenuContext)