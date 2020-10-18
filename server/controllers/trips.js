const {trips, countries, userCountries} = require('../utils/database');
const googleDrive = require('../apis/googleDrive');

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

exports.list = (req, res) => {
    const userId = req.params.userId;
    res.status(200).json(trips);
};

exports.map = (req, res) => {
    const mapId = req.params.mapId;
    res.status(200).json(userCountries);
};

exports.saveMap = (req, res) => {
    res.status(200).json({
        ...req.body
    });
};

exports.files = (req, res) => {
    const tripId = req.params.tripId;
    const trip = trips.find(trip => trip.id == tripId);
    googleDrive.get('/files?q="' + trip.folderId +'"+in+parents')
        .then(response => response.data.files.slice(0,5))
        .then(files => {
            const filesBatch = files.map(file => {
                let properties = ['id', 'fileExtension', 'webViewLink'];
                if (file.mimeType.includes('image')) properties = [...properties, 'imageMediaMetadata'];
                return googleDrive.get(`/files/${file.id}`, { params: { fields: properties.join(',') } });
            });
            return Promise.allSettled(filesBatch);
        })
        .then(response => {
            const files = [];
            response.forEach(file => {
                if(file.value) {
                    const { data } = file.value;
                    let fileData = { 
                        id: data.id,
                        fileExtension: data.fileExtension,
                        webViewLink: data.webViewLink 
                    };

                    if (data.imageMediaMetadata) {
                        fileData = {
                            ...fileData,
                            location: data.imageMediaMetadata.location,
                            time: data.imageMediaMetadata.time
                        };
                    }
                    files.push(fileData);
                }
            });
            res.json(files);
        })
        .catch(err => {
            res.json({
                ...err
            });
        });
}

