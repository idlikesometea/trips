import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect, useDispatch } from 'react-redux';

import './Map.css';
import maps from '../utils/maps';
import Trip from '../models/Trips.model';
import { fetchCountries } from '../actions';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const Map = ({ trip, countries, loading }: { trip:Trip, countries:string[], loading:boolean }) => {
  let mapRef = useRef<HTMLDivElement>(null);
  let map = useRef<any>();
  let markers = useRef<any>([]);
  let activeTrip = useRef<boolean>(false);
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
  }, [dispatch]);

  useEffect(() => {
    if (countries.length) {
      maps.highlightCountries(map.current, countries);
      map.current.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(countries));
    }
  }, [countries]);

  useEffect(() => {
    if (trip.name) {
      activeTrip.current = true;
      map.current.setLayoutProperty('countries', 'visibility', 'none');
      markers.current = maps.addMarkers(map.current, trip.files);
      map.current.flyTo({
        center: maps.getRelativeCenter(trip.files),
        zoom: 7
      });
    } else if (activeTrip.current){
      activeTrip.current = false;
      markers.current = maps.removeMarkers(markers.current);
      map.current.setLayoutProperty('countries', 'visibility', 'visible');
      map.current.flyTo({
        center: [-50,40],
        zoom: 2
      });
    }
  }, [trip]);

  return (
    <div>
      <div ref={mapRef} id="mapContainer" className="mapContainer"></div>
    </div>
  );
};

const mapPropsToState = state => {
  return { 
    countries: state.countries.data, 
    trip: state.trips.trip,
    loading: state.countries.loading
  };
}

export default connect(mapPropsToState, {
  fetchCountries
})(Map);