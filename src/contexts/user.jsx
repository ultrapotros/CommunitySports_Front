import React, { useState, useEffect } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {

  const [user, setUser] = useState();
  const loggedUserJSON = window.sessionStorage.getItem('user');
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem("jwt"));
  
  useEffect(() => {
    if (loggedUserJSON) {
        const loggedUser= JSON.parse(loggedUserJSON);
        setUser(loggedUser);
    }

  }, [user]);

  return (
    <Context.Provider value={{ jwt, setJWT, user, setUser }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
