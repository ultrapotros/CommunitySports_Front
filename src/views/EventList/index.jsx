import getUserEvents from "helpers/events/getUserEvents";
import { useSession } from "helpers/session/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const eventData = [
  {
    id: "1",
    sportid: "11111",
    author: "111",
    accessibility: 2,
    date: new Date(),
    sex: "f",
    level: 5,
    placeid: "1111111111111",
    latitud: -3.7086993281311904,
    longitud: 40.47876758357458,
  },
  {
    id: "2",
    sportid: "22222",
    author: "222",
    accessibility: 3,
    date: new Date(),
    sex: "a",
    level: 2,
    placeid: "22222222222",
    latitud: -3.6737317205040503,
    longitud: 40.42810291538114,
  },
];

export const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(eventData);

  const { user, jwt } = useSession();

  useEffect(() => {
    async function fetchUserEvents() {
      if (user.id) {
        const data = await getUserEvents(user.id, jwt);
        setEvents(data);
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
