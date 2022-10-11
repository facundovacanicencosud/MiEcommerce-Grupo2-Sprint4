import { createContext, useState } from "react";

export const AppContext = createContext();

export const Contexto = ({ children }) => {
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState(false);


  const value = {
    activeSidebar,
    setActiveSidebar,
    searchQuery,
    setSearchQuery,
    theme,
    setTheme
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
