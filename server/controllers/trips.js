const googleDrive = require('../apis/googleDrive');

exports.trips = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const trips = [
        {name: 'Italia 2017'},
        {name: 'NYC - Spain 2019'},
        {name: 'Eurotrip 2018'}, 
    ];
    res.status(200).json({
        success: true,
        data: trips
    });
};

exports.countries = (req, res) => {
    const userId = req.params.userId;
    console.log(userId, 'server');
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
    const folderId = req.params.folderId;
    googleDrive.get('/files?q="' + folderId +'"+in+parents')
    .then(response => {
        res.status(200).json({
            success: true,
            data: response.data.files
        });
    })
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
        params: { 
            fields: 'imageMediaMetadata'
        } 
    })
    .then(response => {
        res.status(200).json({
            success: true,
            data: response.data.imageMediaMetadata
        });
    })
    .catch(err => {
        res.status(err.response.status).json({
            success: false,
            message: err.response.statusText,
            ...err
        });
    });
} 