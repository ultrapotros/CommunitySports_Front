import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export const EventDetail = () => {
  const [event, setEvent] = useState(useLocation().state);

  // ESTILO

  return <div>{event.author}</div>;
};
