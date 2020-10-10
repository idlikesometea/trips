import mapboxgl from 'mapbox-gl';

const colors = [
    '#668134', '#FD8B7B', '#32784E', '#006A61', '#115965', '#C0564A', '#2F4858'
];

let colorIdx = 0;
const getStops = (countries) => {
  return countries.map(country => {
    const color = colors[colorIdx];
    colorIdx = colorIdx + 2 > colors.length ? 0 : colorIdx + 1;
    return [country, color];
  });
}

const highlightCountries = (map, countries) => {
  return map.addLayer({
    id: 'countries',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'ADM0_A3_IS',
        type: 'categorical',              
        stops: getStops(countries)
      }
    },
    source: {
      'type': 'vector',
      'url': 'mapbox://idlikesometea.a56wdqwz'
    },
    "source-layer": 'ne_10m_admin_0_countries-4c5tp1'
  }, 'settlement-minor-label');  
};

const addMarkers = (map, files) => {
  const markers = [];
  files.forEach(file => {
    if (file.fileExtension === 'jpg' && file.location) {
      const { location } = file;
      let el = document.createElement('div');
      el.className = 'marker mapboxgl-marker';
      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<p><img src="https://drive.google.com/thumbnail?id=${file.id}"></p>`)
        )
      .addTo(map);
      markers.push(marker);
    }
  });
  return markers;
};

const removeMarkers = (markers) => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].remove();
  }
  return [];
};

const getRelativeCenter = (files) => {
  const locFiles = files.filter(file => file.location);
  const longSum = locFiles.reduce((acc, curr) => {return acc + curr.location.longitude}, 0);
  const latSum = locFiles.reduce((acc, curr) => {return acc + curr.location.latitude}, 0);
  return [longSum / locFiles.length, latSum / locFiles.length];
};

export default {
  highlightCountries,
  addMarkers,
  removeMarkers,
  getRelativeCenter
};