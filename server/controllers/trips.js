const {trips, tripFiles, userCountries} = require('../utils/database');
const { countries } = require('../utils/countries');

exports.countries = (req, res) => {
    const noFlag = ['aq', 'bq', 'cw', 'gg', 'im', 'je', 'bl', 'mf', 'sx', 'ss'];
    const countryOptions = countries.map(country => {
        const flag = !noFlag.includes(country["alpha-2"].toLowerCase()) ? country["alpha-2"].toLowerCase() : '';
        return {
            key: country["country-code"],
            value: country["alpha-3"],
            flag,
            text: country.name
        };
    });
    res.status(200).json(countryOptions);
};

exports.getTrips = (req, res) => {
    const tripId = req.params.id;
    let data = trips;
    if (tripId) {
        data = trips.find(trip => trip.id == tripId);
        data.files = tripFiles;
    }
    res.status(200).json(data);
};

exports.saveTrip = (req, res) => {
    const trip = req.body;
    res.status(201).json(trip);
};

exports.map = (req, res) => {
    const mapId = req.params.mapId;
    res.status(200).json(userCountries);
};

exports.saveMap = (req, res) => {
    res.status(200).json({
        id: Math.random()
    });
};

exports.userTrips = (req, res) => {
    res.status(200).json({
        map: Math.random(), // null when no map
        trips,
        visitedCountries
    });
}


