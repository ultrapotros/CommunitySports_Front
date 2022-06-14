import delUserEvent from "helpers/events/delUserEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EventList = ({ events }) => {
  const navigate = useNavigate();
  const { user, jwt } = useSession();

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

  console.log("Events", events);

  return (
    <div>
      <h1>HELLO</h1>
      {events.map((event) => (
        <>
          <button onClick={() => navigate("/event/detail", { state: event })}>
            {event.users && event.users.some((userId) => userId === user?.id)
              ? "Abandonar "
              : "Inscribirme "}
            Go to event {event.id}
          </button>
        </>
      ))}
    </div>
  );
};
