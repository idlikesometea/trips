import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import {Viewport, InitialViewPort} from './models/App.model';
import TripsList from './components/TripsList';

const trips = [
  {name: 'Italia 2017'},
  {name: 'NYC - Spain 2019'},
  {name: 'Eurotrip 2018'}, 
];

const initialViewport = InitialViewPort;

export default () => {
  const [viewport, setViewport] = useState(initialViewport);

  const [trip, setTrip] = useState(null);

  console.log(trip);

  return (
    <div >
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport:Viewport) => setViewport(viewport)}
        mapStyle='mapbox://styles/idlikesometea/ckf7l0oec0ila19mpxv1j1132'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />

      <TripsList 
        trips={trips}
        onTripsChange={setTrip} 
      />
    </div>
  );
}
