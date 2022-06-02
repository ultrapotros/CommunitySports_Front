import axios from "axios";
const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

export default function getEvents(params, jwt) {
  const keys = ["sex"];
  let queryString = "";
  keys.forEach((key) => {
    queryString += `${key}=${params[key]}&`;
  });

  return axios
    .get(`${ENDPOINT}/event/search?${queryString}`, {
      headers: {
        authorization: jwt,
      },
    })
    .then((res) => {
      if (!res.data) throw new Error("Response is NOT ok");
      return res.data;
    })
    .catch(() => {
      console.log("ERR: 500");
    });
}
