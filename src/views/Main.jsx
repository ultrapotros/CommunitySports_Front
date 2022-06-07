import { useSession } from "helpers/session/useSession";
import React from "react";
import { useNavigate } from "react-router-dom";
import Map from '../components/Map/Map'
import datas from '../assets/data/centros_deportivos.json'

export const Main = () => {
  const navigate = useNavigate();
  const { logout } = useSession();
  const myhome = {lat:datas[0].Longitud,lng:datas[0].Latitud}
  console.log({myhome})
  return (
    <div className="app">
      <h1>Make History</h1>
      <Map data={datas} home={myhome}/>
      <button onClick={() => navigate("/template")}>templates</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};
