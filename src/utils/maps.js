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

export default {
    highlightCountries
}