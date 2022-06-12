// import getUserEvents from "helpers/events/getUserEvents";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EventList = ({ eventData }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(eventData);

  const { user, jwt } = useSession();

  useEffect(() => {
    async function fetchUserEvents() {
      if (user.id) {
        // const data = await getUserEvents(user.id, jwt);
        // setEvents(data);
      }
    }
    fetchUserEvents();
  }, [user]);

  return (
    <div>
      <h1>HELLO</h1>
      {events.map((event) => (
        <button onClick={() => navigate("/event/detail", { state: event })}>
          Go to event {event.id}
        </button>
      ))}
    </div>
  );
};
