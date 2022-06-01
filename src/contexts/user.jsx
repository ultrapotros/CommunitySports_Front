import React, { useState, useEffect } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => window.sessionStorage.getItem("user"));
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem("jwt"));

  useEffect(() => {
    if (typeof user === "string") {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  }, [user]);

  return (
    <Context.Provider value={{ jwt, setJWT, user, setUser }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
