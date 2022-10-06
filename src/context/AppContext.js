import { createContext, useState } from "react";


export const AppContext = createContext();


export const Contexto = ({children}) => {
    const [activeSidebar, setActiveSidebar] = useState(false);

    const value = {
        activeSidebar,
        setActiveSidebar,
    }

    return(
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}