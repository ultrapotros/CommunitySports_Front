import delUserEvent from "helpers/events/delUserEvent";
import getEvent from "helpers/events/getEvent";
import postUserEvent from "helpers/events/postUserEvent";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const EventDetail = () => {
  const { user, jwt } = useSession();
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

  const handleInscription = async () => {
    await postUserEvent(
      {
        id_user: "0006f578-eddb-457b-bcda-c8e9f5146ccf",
        id_event: "08486b2a-bf12-4c48-9989-3fdd52739c4e",
      },
      jwt
    );
    if (event && user) {
      await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  const handleLeave = async () => {
    if (event && user) {
      await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  // ESTILO

  return (
    <div>
      {/* check for inscribed user   //----users_events.id_user = user.id -> abandonar */}
      {event?.id}
      <button onClick={handleInscription}>Inscribir</button>
    </div>
  );
};
