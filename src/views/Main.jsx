import Modal from "components/Modal";
import { ModalSession } from "components/SessionModal";
import { useSession } from "helpers/session/useSession";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from '../components/Map/Map'
import datas from '../assets/data/centros_deportivos.json'

export const Main = () => {
  const navigate = useNavigate();
  const { logout } = useSession();
  const myhome = {lat:datas[0].Longitud,lng:datas[0].Latitud}
  console.log({myhome})
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="app">
      <h1>Make History</h1>
      <Map data={datas} home={myhome}/>
      <button onClick={() => navigate("/template")}>templates</button>
      <button onClick={() => logout()}>logout</button>
      <button onClick={() => setOpenModal(true)}>OpenModal</button>
      <Modal onOpen={openModal} setOnOpen={setOpenModal}>
        <ModalSession />
      </Modal>
    </div>
  );
};
