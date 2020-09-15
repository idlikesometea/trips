import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
// import TripsList from './components/TripsList';

const trips = [
  {name: 'Eurotrip 2018'}, 
  {name: 'Italia 2017'},
  {name: 'NYC - Spain 2019'}
];

export default () => {
  const [viewport, setViewport] = useState({
    width: 'fit',
    height: '100vh',
    latitude: 21.1458,
    longitude: 79.0882,
    zoom: 1
  });

  const [trip, setTrip] = useState(null);

  return (
    <div >
      <ReactMapGL
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle='mapbox://styles/idlikesometea/ckf4a8clu143419kwbj44nshd'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />

      {/* <TripsList 
        trips={trips}
        onTripsChange={setTrip} 
      /> */}
    </div>
  );
}
