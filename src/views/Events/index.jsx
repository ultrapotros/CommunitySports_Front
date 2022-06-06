import getEvents from "helpers/events/getEvents";
import postEvent from "helpers/events/postEvent";
import { useSession } from "helpers/session/useSession";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Events = () => {
  const navigate = useNavigate();
  const { jwt } = useSession();
  const [event, setEvent] = useState({});

  const handleCreate = async (e) => {
    e.preventDefault();
    // validate all values
    await postEvent(event, jwt);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await getEvents(event, jwt);
  };

  const handleStateChange = (e, key) => {
    setEvent((prevState) => {
      let data = Object.assign({}, prevState);
      data[key] = e.target.value;
      return data;
    });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="sexo"
          value={event.sex}
          onChange={(e) => handleStateChange(e, "sex")}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleCreate}>Create</button>
      </form>
      <button onClick={() => navigate("/")}>back</button>
    </>
  );
};
