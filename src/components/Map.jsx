import React, {useState , useCallback} from 'react'
import { GoogleMap, useJsApiLoader , Marker , MarkerClusterer, TransitLayer } from '@react-google-maps/api';
import house from '../assets/img/home_icon.png'


const containerStyle = {
  width: '400px',
  height: '400px'
};

function Map({data,home}) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MY_API_KEY
  })

  const [map, setMap] = useState(null)

  
  const [mapCenter, setMapCenter] = useState(home)
  const [zoomClick, setZoomClick] = useState(15)
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
    console.log(e)
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

      <button type="button" onClick={handleForm}>Create Itinerary</button>
    </main>
  ) : <h1>Charging...</h1>
}

export default React.memo(Map)