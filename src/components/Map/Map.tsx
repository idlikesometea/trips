import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import TripsList from './TripsList';
import './Map.css';
import maps from '../../utils/maps';
import Trip from '../../models/Trips.model';
import { fetchCountries } from '../../actions';
import api from '../../services/api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const Map = ({ trip }: { trip:Trip }) => {
  let mapRef = useRef<HTMLDivElement>(null);
  let map = useRef<any>();
  let markers = useRef<any>([]);
  let activeTrip = useRef<boolean>(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ countries, setCountries ] = useState([]);
  const [ loadingCountries, setLoadingCountries ] = useState<boolean>(false);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current || 'mapContainer',
      style: 'mapbox://styles/idlikesometea/ckf7l0oec0ila19mpxv1j1132',
      center: [-50, 40],
      zoom: 1.8
    }).on('load', () => {
      setLoadingCountries(true);
      api.get(`trips/countries/${id}`)
        .then(response => {
          setLoadingCountries(false);
          setCountries(response.data);
        })
        .catch(err => setLoadingCountries(false));
    });
  }, [dispatch, id]);

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
    <div className="appContainer">
      <TripsList />
      {loadingCountries ? <div className="loading-alert">Loading countries</div> : null}
      <div ref={mapRef} id="mapContainer" className="mapContainer"></div>
    </div>
  );
};

const mapPropsToState = state => {
  return { 
    trip: state.trips.trip
  };
}

export default connect(mapPropsToState, {
  fetchCountries
})(Map);