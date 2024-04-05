import { createContext, useEffect, useState } from "react";
import { data } from '../lib/data';


export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('admin')){
      setIsLogged(true);
    }
  }, [])

  useEffect(() => {
    if(isLogged && !localStorage.getItem('users')){
      localStorage.setItem('users', JSON.stringify(data));
      setIsUser(!isUser);
    }
  }, [isLogged])


  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, isUser, setIsUser }}>
      {children}
    </LoginContext.Provider>
  )
}

