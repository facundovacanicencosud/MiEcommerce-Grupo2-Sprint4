import { createContext, useState } from "react";

export const AppContext = createContext();

export const Contexto = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const value = {
    activeSidebar,
    setActiveSidebar,
    searchQuery,
    setSearchQuery,
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
