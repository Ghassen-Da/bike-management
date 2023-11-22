import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import StationDetails from './station-details';


const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 59.936006155097004,
  lng: 10.73190903696522
};


export default function Map(props) {
  // This variable is responsible for the dialog box
  const [open, setOpen] = React.useState(false);
  
  // This variable is responsible for the data of the dialog box
  const [selectedStation, setSelectedStation] = React.useState({});

  let stations = props.stations
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD4Wgflkm61GbO6HRQDos0FN6gRI6inHw8"
  })
  
  const [map, setMap] = React.useState(null)
  
  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(14)
    
    setMap(map)
  }, [])
  
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  

  // Responsible for opening the dialog box
  function handleDialogOpen(station){
    setSelectedStation(station);
    console.log(station);
    setOpen(true);
  }
  
  // Responsible for closing the dialog box
  let handleDialogClose = () =>{
    setOpen(false);
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {stations?.map(station=>(
          <Marker
          key={station?.station_id}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 5,    
              fillColor: "black",
              fillOpacity: 1
            }}
            position={{lat: station?.lat,lng: station?.lon}}
            label={{text:station?.capacity.toString(),color:'#fff', fontSize:"8px"}}
            onClick={()=>handleDialogOpen(station)}
          />      
        ))
        }
        <StationDetails
        open={open}
        onClose={handleDialogClose}
        station={selectedStation}
      />
      </GoogleMap>
  ) : <></>
}