import {createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({children})=>{


    const {data:user,error,loading,fn:fetchUser} = useFetch(getCurrentUser);

    const isAuthenticated = (user?.role === "authenticated");

    useEffect(()=>{
        fetchUser();
    },[])

    return <UrlContext.Provider value={{user,fetchUser,isAuthenticated,loading}}>
        {children}
    </UrlContext.Provider>
}

// read about it later
export const UrlState = () =>{
    return useContext(UrlContext);  // nothing instead of writing useCOntext(UrlContext)
                                    // with this we will write UrlState()
}

export default UrlProvider;