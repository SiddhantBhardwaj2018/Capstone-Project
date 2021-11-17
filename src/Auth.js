import React, { useEffect, useState } from "react";
import app from "./firebase.js";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [coins,setCoins] = useState({})

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

 
  if(pending){
    return <>Loading...</>
  }
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        coins
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
