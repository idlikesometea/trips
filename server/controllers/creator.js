const { trips, userCountries } = require("../utils/database");

exports.getMap = (req, res) => {
    const user = req.user;
    const map = req.params.mapId;

    setTimeout(() => {
        res.status(200).json({
            name: 'Trips Map',
            countries: userCountries,
            createdAt: new Date('2020-11-02').getTime()
        });
    }, 500);
};

exports.getTrips = (req, res) => {
    const user = req.user;
    const mapId = req.params.mapId;
    setTimeout(() => {
        res.status(200).json(trips);
    }, 500);
};

exports.getTrip = (req, res) => {
    const user = req.user;
    const tripId = parseInt(req.params.tripId);
    const trip = trips.find(trip => trip.id === tripId);
    setTimeout(() => {
        res.status(200).json(trip);
    }, 500);
};

exports.postMap = (req, res) => {
    const user = req.user;
    const mapId = req.params.mapId;
    const map = JSON.parse(req.body.map);
    setTimeout(() => {
        res.status(200).json({mapId, map});
    }, 500);
};

exports.postTrip = (req, res) => {
    const user = req.user;
    const tripId = req.params.tripId;
    const trip = req.body.trip;
    setTimeout(() => {
        res.status(200).json({tripId, trip});
    }, 500);
};

exports.deleteMap = (req, res) => {
    const user = req.user;
    const mapId = req.params.mapId;
    setTimeout(() => {
        res.status(202).json({mapId});
    }, 500);
}

exports.deleteTrip = (req, res) => {
    const user = req.user;
    const tripId = req.params.tripId;
    setTimeout(() => {
        res.status(202).json({tripId});
    }, 500);
}