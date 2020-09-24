import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';
import { InitialViewPort } from '../models/Map.model';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';
const initialViewport = InitialViewPort

const countries = [
    'USA', 'MEX', 'CAN', 'CRI', 'CUB', 'ESP', 'FRA', 'NLD',
    'ITA', 'DEU', 'PRT', 'CHE', 'AUT', 'LIE', 'SVN', 'HRV',
    'HUN', 'SVK', 'CZE'
];

const colors = [
    '#668134', '#FD8B7B', '#32784E', '#006A61', '#115965', '#C0564A', '#2F4858'
];

let colorIdx = 0;
const getStops = () => {
    return countries.map(country => {
        const color = colors[colorIdx];
        colorIdx = colorIdx + 2 > colors.length ? 0 : colorIdx + 1;
        return [country, color];
    });
}

const Map = () => {
    const [viewport, setViewport] = useState(initialViewport);
    let mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapRef.current || 'mapContainer',
        style: 'mapbox://styles/idlikesometea/ckf7l0oec0ila19mpxv1j1132',
        center: [viewport.longitude, viewport.latitude],
        zoom: viewport.zoom
      });

      map.on('load',() => {
        map.addLayer({
            id: 'countries',
            type: 'fill',
            paint: {
                'fill-color': {
                  property: 'ADM0_A3_IS',
                  type: 'categorical',              
                    stops: getStops()
                }
            },
            source: {
                'type': 'vector',
                'url': 'mapbox://idlikesometea.a56wdqwz'
            },
            "source-layer": 'ne_10m_admin_0_countries-4c5tp1'
        }, 'settlement-minor-label');  
        map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(countries));
      });
    }, [viewport]);
  
    return (
      <div>
        <div ref={mapRef} id="mapContainer" className="mapContainer"></div>
      </div>
    );
};

export default Map;