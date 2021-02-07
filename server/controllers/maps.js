const { trips, tripFiles, trip, userCountries } = require('../utils/database');

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

exports.postTrip = (req, res) => {
    const countries = req.body.countries;
    res.status(200).json({countries});
};
