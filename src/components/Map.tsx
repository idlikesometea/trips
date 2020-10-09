import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect, useDispatch } from 'react-redux';

import './Map.css';
import maps from '../utils/maps';
import Trip from '../models/Trips.model';
import { File } from '../models/Files.model';
import { fetchCountries } from '../actions';
import api from '../services/api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const getNewCenter = (locations) => {
  return [locations[0].longitude, locations[0].latitude];
}

const Map = ({ trip, countries, loading }: { trip:Trip, countries:string[], loading:boolean }) => {
  let mapRef = useRef<HTMLDivElement>(null);
  let map = useRef<any>();
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
      api.get('/trips/files/' + trip.id)
        .then((files:any) => {
          console.log(files);
          // map.current.setLayoutProperty('countries', 'visibility', 'none');
          // const locations: any = [];
          // images.forEach(image => {
          //   if (image.imageMediaMetadata) {
          //     const { location } = image.imageMediaMetadata;
          //     locations.push(location);
          //     let el = document.createElement('div');
          //     el.className = 'marker mapboxgl-marker';
          //     new mapboxgl.Marker(el)
          //     .setLngLat([location.longitude, location.latitude])
          //     .setPopup(new mapboxgl.Popup({ offset: 25 })
          //       .setHTML(`<p><img src="https://drive.google.com/thumbnail?id=${image.id}"></p>`)
          //     )
          //     .addTo(map.current);
          //   }
          // });
          // map.current.flyTo({
          //   center: getNewCenter(locations),
          //   zoom: 7
          // });
        })
        .catch(err => {
          console.warn(err);
        })
    } else if (activeTrip.current){
      activeTrip.current = false;
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
    trip: state.trips.activeTrip,
    loading: state.countries.loading 
  };
}

export default connect(mapPropsToState, {
  fetchCountries
})(Map);