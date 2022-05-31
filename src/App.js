import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Views _____________________________________
import { Session } from "./views/Session";
import { Main } from "./views/main";
import { Error } from "./views/Error";
// Context ___________________________________
import { UserContextProvider } from "./contexts/user";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <main className="app--main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Session />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </main>
        {/* Protects routes from not loged users */}
        {/* <Redirect /> */}
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
