import Modal from "components/Modal";
import { ModalSession } from "components/SessionModal";
import { useSession } from "helpers/session/useSession";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const { logout } = useSession();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="app">
      <h1>Make History</h1>
      <button onClick={() => navigate("/template")}>templates</button>
      <button onClick={() => logout()}>logout</button>
      <button onClick={() => setOpenModal(true)}>OpenModal</button>
      <Modal onOpen={openModal} setOnOpen={setOpenModal}>
        <ModalSession />
      </Modal>
    </div>
  );
};
