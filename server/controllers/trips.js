const {trips, tripFiles, userCountries} = require('../utils/database');
const { countries } = require('../utils/countries');

trips.sort((a, b) => parseInt(a.startDate) - parseInt(b.startDate));

exports.countries = (req, res) => {
    const noFlag = ['aq', 'bq', 'cw', 'gg', 'im', 'je', 'bl', 'mf', 'sx', 'ss'];
    const countryOptions = countries.map(country => {
        const countryCode = country["alpha-2"].toLowerCase();
        const flag = !noFlag.includes(countryCode) ? countryCode : '';
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
        trip = trips.find(trip => trip.id == tripId);
        data = {...trip, files: tripFiles};
    }
    res.status(200).json(data);
};

exports.saveTrip = (req, res) => {
    const trip = req.body;
    res.status(201).json(trip);
};

exports.map = (req, res) => {
    const mapId = req.params.mapId;
    res.status(200).json({
        map: mapId,
        countries: userCountries,
        trips
    });
};

exports.saveMap = (req, res) => {
    res.status(200).json({
        id: Math.random()
    });
};

exports.dashboard = (req, res) => {
    const userId = req.user.id;

    res.status(200).json({
        map: Math.random(),
        countries: userCountries,
        trips
    });
}
