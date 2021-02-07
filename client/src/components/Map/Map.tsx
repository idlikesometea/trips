import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Map.css';
import TripsSelector from './TripsSelector';
import { fetchMap } from '../../state/actions';
import maps from '../../utils/maps';
import { mapStateProps } from '../../models/Map.model';
import { Message } from '../ui/Message';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const Map = ({state}: mapStateProps) => {
  let mapRef = useRef<HTMLDivElement>(null);
  let map = useRef<any>();
  let markers = useRef<any>([]);
  let activeTrip = useRef<boolean>(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current || 'mapContainer',
      style: 'mapbox://styles/idlikesometea/ckf7l0oec0ila19mpxv1j1132',
      center: [-50, 40],
      zoom: 1.8
    }).on('load', () => {
      dispatch(fetchMap(id));
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (state.countries.length) {
      maps.highlightCountries(map.current, state.countries);
      map.current.setFilter('countries', ['in', 'ADM0_A3_IS'].concat(state.countries));      
    }
  }, [state.countries]);

  useEffect(() => {
    if (state.selectedTrip.name) {
      activeTrip.current = true;
      map.current.setLayoutProperty('countries', 'visibility', 'none');
      markers.current = maps.addMarkers(map.current, state.selectedTrip.files);
      map.current.flyTo({
        center: maps.getRelativeCenter(state.selectedTrip.files),
        zoom: 7
      });
    } else if (activeTrip.current){
      activeTrip.current = false;
      markers.current = maps.removeMarkers(markers.current);
      map.current.setLayoutProperty('countries', 'visibility', 'visible');
      map.current.flyTo({
        center: [-50,40],
        zoom: 1
      });
    }
  }, [state.selectedTrip]);

  return (
    <div className="appContainer">
      {<TripsSelector />}
      
      {state.loading ? <div className="loading-alert">Loading countries</div> : null}
      
      <div ref={mapRef} id="mapContainer" className="mapContainer"></div>
      
      { state.errorMessage 
        ? <Message type="error" title="Error" message={state.errorMessage} /> 
        : null
      }
    </div>
  );
};

const mapPropsToState = state => {
  return {
    state: {
      loading: state.map.loading,
      countries: state.map.countries,
      trips: state.map.trips,
      selectedTrip: state.trip.trip,
      errorMessage: state.map.errorMessage
    }
  };
}

export default connect(mapPropsToState, {
  fetchMap
})(Map);