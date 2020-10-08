const googleDrive = require('../apis/googleDrive');

exports.trips = (req, res) => {
    const userId = req.params.userId;
    const trips = [
        {id: 1, name: 'Las Vegas 2018'},
        {id: 2, name: 'NYC - Spain 2019'},
        {id: 3, name: 'Eurotrip 2018'}, 
    ];
    res.status(200).json(trips);
};

exports.countries = (req, res) => {
    const userId = req.params.userId;
    const countries = [
        'USA', 'MEX', 'CAN', 'CRI', 'CUB', 'ESP', 'FRA', 'NLD',
        'ITA', 'DEU', 'PRT', 'CHE', 'AUT', 'LIE', 'SVN', 'HRV',
        'HUN', 'SVK', 'CZE'
    ];
    res.status(200).json({
        success: true,
        data: countries
    });
};

exports.files = (req, res) => {
    const tripId = req.params.tripId;
    const trips = [
        { tripId: 1, folderId: '1roVvu5crNM6Lfij2TV_y1j4qCZ5ZRAsw'},
        { tripId: 2, folderId: '1roVvu5crNM6Lfij2TV_y1j4qCZ5ZRAsw' },
        { tripId: 3, folderId: '1roVvu5crNM6Lfij2TV_y1j4qCZ5ZRAsw' }
    ];
    const trip = trips.filter(trip => trip.tripId == tripId);
    const files = [];
    googleDrive.get('/files?q="' + trip[0].folderId +'"+in+parents')
        .then(response => response.data.files.slice(0, 20))
        .then(files => res.status(200).json(files))
        .catch(err => {
            res.status(err.response.status).json({
                success: false,
                message: err.response.statusText,
                ...err
            });
        });
}

exports.file = (req, res) => {
    const fileId = req.params.fileId;
    googleDrive.get('/files/' + fileId, { 
        params: { fields: 'imageMediaMetadata,id' } 
    })
    .then(response => res.status(200).json(response.data))
    .catch(err => {
        res.status(err.response.status).json({
            success: false,
            message: err.response.statusText,
            ...err
        });
    });
} 