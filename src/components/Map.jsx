import React, {useState , useCallback} from 'react'
import { GoogleMap, useJsApiLoader , Marker , MarkerClusterer, TransitLayer } from '@react-google-maps/api';
import house from '../assets/img/home_icon.png'
import { useTranslation } from "react-i18next"


const containerStyle = {
  width: '400px',
  height: '400px'
};

function Map({data,home}) {
  const [t, i18n] = useTranslation("global");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MY_API_KEY
  })
  const [map, setMap] = useState(null)

  
  const [mapCenter, setMapCenter] = useState(home)
  const [zoomClick, setZoomClick] = useState(15)
  const [modalInfo, setModalInfo] = useState()
  const [modal, setModal] = useState(false)


  const handleForm = ()=> {
    console.log('open form')
  }

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(home || {lat:data[parseInt(data.length/2)].Longitud,lng:data[parseInt(data.length/2)].Latitud} );
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const handleDrag = (e)=> {
    setMapCenter(e)
  }

  const handleMarker = (e)=>{
    setModalInfo(e)
    setModal(true)
    console.log(e)
    console.log(modal)
  }
  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <main>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={home || {lat:data[parseInt(data.length/2)].Longitud,lng:data[parseInt(data.length/2)].Latitud}}
        zoom={zoomClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
            { /* Child components, such as markers, info windows, etc. */ }
            {home? <Marker 
            position={home}
            draggable={true}
            onDragEnd={(e)=>handleDrag(e)}
            icon=
            {house}
          /> :null }
          <MarkerClusterer averageCenter= {true}>
          {(clusterer)=> data.map((e,index)=> 
          <Marker id={index} key={index}
            position={{lat:e.Longitud, lng:e.Latitud}}
            clusterer={clusterer}
            onClick={()=>handleMarker(e)}
          /> )}
          </MarkerClusterer>
        <TransitLayer />
      </GoogleMap>
      {modal && <div className="event-modal" style= {{backgroundColor:"yellow"}}>
            <ul className="event-modal-list">
              {modalInfo.sport && <li><div>{t("forms.sport")}</div><div>{modalInfo.sport}</div></li>}
              {modalInfo.type && <li><div>{t("forms.type")}</div><div>{modalInfo.type}</div></li>}
              {modalInfo.date && <li><div>{t("forms.date")}</div><div>{modalInfo.date}</div></li>}
              {modalInfo.time && <li><div>{t("forms.time")}</div><div>{modalInfo.time}</div></li>}
              {modalInfo.Centro && <li><div>{t("forms.center")}</div><div>{modalInfo.Centro}</div></li>}
              {modalInfo.Movilidad && <li><div>{t("forms.movility")}</div><div>{modalInfo.Movilidad}</div></li>}
            </ul>
            <button type="button" onClick={()=>console.log('apuntarse')}>{t("forms.signEvent")}</button>
            <button type="button" onClick={()=>setModal(false)}>x</button>
        </div>}

      <button type="button" onClick={handleForm}>Create Itinerary</button>
    </main>
  ) : <h1>Charging...</h1>
}

export default React.memo(Map)