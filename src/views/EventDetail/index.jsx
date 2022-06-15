import delUserEvent from "helpers/events/delUserEvent";
import getEvent from "helpers/events/getEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EventDetail = () => {
  const { user, jwt } = useSession();
  const navigate = useNavigate();
  const [inscribed, setInscribed] = useState(false);
  const [event, setEvent] = useState(useLocation().state);

  useEffect(() => {
    async function fetchdata() {
      if (!event) {
        const idEvent = window.location.href.split("/detail/")[1];
        if (!idEvent) return;
        console.log("event", idEvent);
        const data = await getEvent(idEvent, jwt);
        console.log(data.id);
        setEvent(data.event);
      }
    }
    // if (user?.id) fetchdata();
    fetchdata();
  }, [user]);

  useEffect(() => {
    if (event) {
      setInscribed(
        event.users && event.users.some((userId) => userId === user?.id)
      );
    }
  }, [user]);

  const handleClick = () => {
    inscribed ? handleLeave() : handleInscription();
    setInscribed(!inscribed);
  };

  const handleInscription = async () => {
    if (event && user?.id) {
      await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  const handleLeave = async () => {
    if (event && user?.id) {
      await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  console.log(event);

  return (
    <>
      {event?.id ? (
        <div>
          <p>
            {event.capacity}
            {event.direction}​ {event.email} ​ {event.hour} ​{event.id_center}
            {event.id_event} ​ {event.id_sport} {event.ind_magnetica}
            {event.latitude}
            {event.longitude} ​{event.mobility} {event.name} ​ {event.organizer}
            {event.podotactile} ​ {event.sex} {event.time} ​ {event.users}
          </p>
          <button onClick={() => handleClick()}>
            {inscribed ? "Abandonar " : "Inscribirme "}
          </button>
        </div>
      ) : (
        <h1>no hay evevntos disponibles</h1>
      )}
    </>
  );
};
