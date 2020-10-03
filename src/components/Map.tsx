import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect, useDispatch } from 'react-redux';

import './Map.css';
import maps from '../utils/maps';
import Trip from '../models/Trips.model';
import { fetchCountries } from '../actions';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const Map = ({ trip, countries }: { trip:Trip, countries:any }) => {
  let mapRef = useRef<HTMLDivElement>(null);
  let map = useRef<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current || 'mapContainer',
      style: 'mapbox://styles/idlikesometea/ckf7l0oec0ila19mpxv1j1132',
      center: [-50, 40],
      zoom: 1.8
    }).on('load', () => {
      dispatch(fetchCountries(3));
    });
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      let mapCurr = map.current;
      mapCurr = maps.highlightCountries(mapCurr, countries);
      mapCurr.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(countries));
    }
  }, [countries]);

  useEffect(() => {
    console.log(trip, 'map trip');
  }, [trip]);

  return (
    <div>
      <div ref={mapRef} id="mapContainer" className="mapContainer"></div>
    </div>
  );
};

const mapPropsToState = state => {
  return { countries: state.countries };
}

export default connect(mapPropsToState, {
  fetchCountries
})(Map);