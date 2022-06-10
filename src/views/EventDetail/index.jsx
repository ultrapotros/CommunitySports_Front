import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const eventData = {
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
};

export const EventDetail = () => {
  const [event, setEvent] = useState(useLocation().state);
  //   const [event, setEvent] = useState(eventData);

  return <div>{event.author}</div>;
};
