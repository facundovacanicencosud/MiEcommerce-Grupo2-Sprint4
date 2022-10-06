import { createContext, useState } from "react";

export const AppContext = createContext();

export const Contexto = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

export const Contexto = ({ children }) => {
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
  
    const changeSidebarButton = () =>{
        setActiveSidebar(x => !x)
    }

  const value = {
    activeSidebar,
    changeSidebarButton,
    setActiveSidebar,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
