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
    if (event && user) {
      await postUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };

  const handleLeave = async () => {
    if (event && user) {
      await delUserEvent({ id_user: user.id, id_event: event.id }, jwt);
    }
  };
  // (|||)INSCRIPCIÓN -> ERROR axios.post({id_user, id_event})
  // Solo mostrar eventos que:
  //----participants < capacity COUNT(users_events) -> insertar en users_events
  //----users_events.id_user = user.id -> abandonar
  // (|||)ABANDONAR
  // ESTILO

  return <div>{event?.id}</div>;
};
