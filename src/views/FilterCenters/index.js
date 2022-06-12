import getEvents from "helpers/events/getEvents";
import postEvent from "helpers/events/postEvent";
import { useSession } from "helpers/session/useSession";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import centros from '../../assets/data/instalaciones.json'
import InputCustom from '../../components/forms/InputCustom'
import {SelectCustom} from '../../components/forms/SelectCustom'
import { useTranslation } from "react-i18next"
import Map from '../../components/Map/Map'

const eventData = [
  {
    "id": "1",
    "sport": "furbol",
    "name":"evento1",
    "Direccion": "CALLE VIA CARPETANA 57, 28047 MADRID",
    "Latitud": 40.39801608457685,
    "Longitud": -3.7352725040539525,
    "Telefono": 689442120,
    "gender":"male",
    "Movilidad": 1,
    "Podotactil": 0,
    "Ind_magnetica": 0,
    "email": "No consta"
  },
  {
    id: "2",
    sportid: "22222",
    author: "222",
    Movilidad: 1,
    Podotactil: 0,
    Ind_magnetica: 0,
    date: new Date(),
    sex: "a",
    level: 2,
    placeid: "22222222222",
    latitud: -3.6737317205040503,
    longitud: 40.42810291538114,
  },
];

const schema = yup.object().shape({
  sport:yup
  .string()
  .trim()
  .min(6,'el campo debe tener minimo 6 caracteres')
  ,
  gender : yup
  .string()
  /* .required() */

})

export const FilterCenters = () => {
  const { jwt, user } = useSession();
  const [event, setEvent] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [eventsFiltered, setEventsFiltered] = useState();
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const {
    control: controlFilter,
    handleSubmit,
    formState: { errors: errorsFilter },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    setEvent((prevState) => {
      let data = Object.assign({}, prevState);
      data.author = user.id;
      return data;
    });
    // validate all values

    await postEvent(event, jwt);
  };

  const onSubmit = (data) => {
    console.log(centros)
    const aux = Object.values(data).map((e)=>e === 'No'? e = 0: e = 1)

    let datafiltered = centros.filter(e=>(e.Movilidad === aux[2] || aux[2] === 0) && 
    (e.Podotactil=== aux[3] || aux[3] === 0)&& (e.Ind_magnetica===aux[4] || aux[4] === 0))

    console.log(datafiltered)
    setEventsFiltered(datafiltered)
    setShowMap(true)
  }

  const handleSearch = async (e) => {
    const aux = e.preventDefault();
    console.log(aux)
    /* await getEvents(event, jwt); */

    setShowMap(true);
  };

  const handleStateChange = (e, key) => {
    setEvent((prevState) => {
      let data = Object.assign({}, prevState); 
      data[key] = e.target.value;
      return data;
    });
  };
console.log(eventsFiltered)
  return (
    <>
      <form className="login-form session-form" onSubmit={handleSubmit(onSubmit)}>
        <SelectCustom
          name='sport'
          control={controlFilter}
          label={t("forms.sport")}
          id='sport-input'
          options={["furgol","pelotacesta","pala"]}
        />
        <SelectCustom
          name='gender'
          control={controlFilter}
          label='gender'
          id='gender-input'
          options={['male','female','other']}
        />
        <SelectCustom
          name='movility'
          control={controlFilter}
          label={t("forms.Movilidad")}
          id='movility-input'
          options={[t("forms.yes"),t("forms.no")]}
        />
        <SelectCustom
          name='podotactil'
          control={controlFilter}
          label={t("forms.Podotactil")}
          id='podotactil-input'
          options={[t("forms.yes"),t("forms.no")]}
        />
        <SelectCustom
          name='ind_magnetic'
          control={controlFilter}
          label={t("forms.Ind_magnetica")}
          id='ind_magnetic-input'
          options={[t("forms.yes"),t("forms.no")]}
        />
        <button type="submit" /* onClick={handleSearch} */>Search</button>
        {/* <button onClick={handleCreate}>Create</button> */}
      <button onClick={() => navigate("/")}>back</button>
      </form>
      {showMap && <div className="map-filtered"><Map data={eventsFiltered}/></div> }
    </>
  );
};
