import delUserEvent from "helpers/events/delUserEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EventList = ({ eventsArray }) => {
  const navigate = useNavigate();
  const { user, jwt } = useSession();
  const [events, setEvents] = useState(eventsArray);

  const handleInscription = async (event) => {
    if (event && user) {
      await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  const handleLeave = async (event) => {
    if (event && user) {
      await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };
  // ESTILO

  return (
    <div>
      <h1>HELLO</h1>
      {events.map((event) => (
        <button onClick={() => navigate("/event/detail", { state: event })}>
          {/* check for inscribed user   //----users_events.id_user = user.id -> abandonar */}
          Go to event {event.id}
        </button>
      ))}
    </div>
  );
};
