import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader , Marker , MarkerClusterer, TransitLayer } from '@react-google-maps/api';
import house from '../../assets/img/home_icon.png'
import { useTranslation } from "react-i18next"


const containerStyle = {
  width: '100%',
  height: '100%'
};

function Map({data,home}) {
  const [t] = useTranslation("global");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MY_API_KEY
  })
  const [map, setMap] = useState(null)

  
  const [mapCenter, setMapCenter] = useState(home || {lat:data[parseInt(data.length/2)].Longitud,lng:data[parseInt(data.length/2)].Latitud})
  const [zoomClick, setZoomClick] = useState(15)
  const [modalInfo, setModalInfo] = useState()
  const [modal, setModal] = useState(false)


  const handleForm = ()=> {
    console.log('open form')
  }


  const handleDrag = (e)=> {
    setMapCenter({lat:e.latLng.lat(e),lng:e.latLng.lng(e)})
  }

  const handleMarker = (e)=>{
    setModalInfo(e)
    setModal(true)
  }
  const getCoordenates = (e)=> {
    console.log({lat:e.latLng.lat(e),lng:e.latLng.lng(e)})
  }

  return isLoaded ? (
    <main style={{width:"100vw",height:"90vh"}}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoomClick}
        onLoad={map => setMap(map)}
        onClick = {getCoordenates}
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
            <ul className="event-modal-labels">
                {Object.keys(modalInfo).map((e,index)=>
                <li className='event-modal-list-labels' id={`label${index}`}>{t(`forms.${e}`)}</li> 
                )}
            </ul>
            <ul className="event-modal-values">
                {Object.values(modalInfo).map((e,index)=>
                <li className='event-modal-list-labels' id={`value${index}`}>{e}</li>
                )}
            </ul>
            <button type="button" onClick={()=>console.log('apuntarse')}>{t("forms.signEvent")}</button>
            <button type="button" onClick={()=>setModal(false)}>X</button>
        </div>}

      <button type="button" onClick={handleForm}>Create Itinerary</button>
    </main>
  ) : <h1>Charging...</h1>
}

export default React.memo(Map)