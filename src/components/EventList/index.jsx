import delUserEvent from "helpers/events/delUserEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EventList = ({ event }) => {
  const navigate = useNavigate();
  const { user, jwt } = useSession();
  const [inscribed, setInscribed] = useState(false);

  useEffect(() => {
    setInscribed(
      event.users && event.users.some((userId) => userId === user?.id)
    );
  }, [user]);

  const handleClick = (event) => {
    inscribed ? handleLeave(event) : handleInscription(event);
    setInscribed(!inscribed);
  };

  const handleInscription = async (event) => {
    if (event && user?.id) {
      await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  const handleLeave = async (event) => {
    if (event && user?.id) {
      await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  console.log(event);

  return (
    <>
      {event?.id ? (
        <div>
          <p
            className="link"
            onClick={() => navigate("/events/detail", { state: event })}
          >
            {event.capacity}
            {event.direction}​ {event.email} ​ {event.hour} ​{event.id_center}
            {event.id_event} ​ {event.id_sport} {event.ind_magnetica}
            {event.latitude}
            {event.longitude} ​{event.mobility} {event.name} ​ {event.organizer}
            {event.podotactile} ​ {event.sex} {event.time} ​ {event.users}
          </p>
          <button onClick={() => handleClick(event)}>
            {inscribed ? "Abandonar " : "Inscribirme "}
          </button>
        </div>
      ) : (
        <h1>no hay evevntos disponibles</h1>
      )}
    </>
  );
};
