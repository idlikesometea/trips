import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';
import api from '../services/api';
import maps from '../utils/maps';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const Map = () => {
  let mapRef = useRef<HTMLDivElement>(null);
  let map;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapRef.current || 'mapContainer',
      style: 'mapbox://styles/idlikesometea/ckf7l0oec0ila19mpxv1j1132',
      center: [-50, 40],
      zoom: 1.8
    });
  }, []);

  useEffect(() => {
    map.on('load',() => {
      getCountries(3)
        .then(countries => {
          map = maps.highlightCountries(map, countries);
          map.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(countries));
      });
    });
  }, []);

  const getCountries = async user => {
    const response = await api.get(`/trips/countries/${user}`);
    return response.data.data;
  };

  return (
    <div>
      <div ref={mapRef} id="mapContainer" className="mapContainer"></div>
    </div>
  );
};

export default Map;