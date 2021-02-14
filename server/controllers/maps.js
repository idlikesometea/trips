const { trips, tripFiles, trip, userCountries } = require('../utils/database');
const { countries } = require('../utils/countries');

trips.sort((a, b) => parseInt(a.startDate) - parseInt(b.startDate));

exports.getMap = (req, res) => {
    const mapId = req.params.mapId;
    res.status(200).json({
        id: mapId,
        countries: userCountries,
        trips: trips
    });
};

exports.getTrip = (req, res) => {
    const tripId = req.params.tripId;
    res.status(200).json({
        tripId,
        trip: {...trip, files: tripFiles}
    });
};

exports.postMap = (req, res) => {
    const countries = req.body.countries;
    res.status(200).json(Math.random());
};

exports.getCountries = (req, res) => {
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
}
