import { useState } from "react";
import { Login } from "components/Login";
import { Register } from "components/Register";

export const ModalSession = () => {
  const [modalLogin, setModalLogin] = useState(false);
  const changeSession = () => {
    setModalLogin(!modalLogin);
  };

  return (
    <div>
      {modalLogin ? <Login></Login> : <Register></Register>}
      <button className="btn session-btn" onClick={changeSession}>
        {modalLogin ? "registrarse" : "logearse"}
      </button>
    </div>
  );
};
