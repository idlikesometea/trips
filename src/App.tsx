import React, { useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import {Viewport, InitialViewPort} from './models/App.model';
import TripsList from './components/TripsList';

const trips = [
  {name: 'Italia 2017'},
  {name: 'NYC - Spain 2019'},
  {name: 'Eurotrip 2018'}, 
];


const layer = {
  'id': 'countries',
  'type': 'fill',
  'paint': {
    'fill-color': '#52489C'
  },
  filter: ['in', 'ADM0_A3_IS', 'FRA']
};

const initialViewport = InitialViewPort;

export default () => {
  const [viewport, setViewport] = useState(initialViewport);
  const [trip, setTrip] = useState(null);

  return (
    <div >
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport:Viewport) => setViewport(viewport)}
        mapStyle='mapbox://styles/idlikesometea/ckf7l0oec0ila19mpxv1j1132'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Source type="geojson" data='https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson'>
          <Layer {...layer} />
        </Source>
      </ReactMapGL>

      <TripsList 
        trips={trips}
        onTripsChange={setTrip} 
      />
    </div>
  );
}
