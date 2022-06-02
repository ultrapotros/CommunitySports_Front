import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Views _____________________________________
import { Session } from "./views/Session";
import { LandPage } from "./views/LandPage/LandPage";
import { Error } from "./views/Error";
import { Events } from "views/Events";

// Components ________________________________
import { Header } from "components/Header/Header";

// Context ___________________________________
import { UserContextProvider } from "./contexts/user";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <main className="app--main">
          <Routes>
            <Route path="/" element={<LandPage />} />
            <Route path="/login" element={<Session />} />
            <Route path="/events" element={<Events />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
