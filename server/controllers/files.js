const googleDrive = require('../apis/googleDrive');

const mocks = require('../utils/mocks');


exports.folders = (req, res) => {
    // googleDrive.get('/files', {
    //     params: {
    //         q: "mimeType = 'application/vnd.google-apps.folder'"
    //     }
    // }).then(response => {
    //     console.log(response.data);
    // })
    // .catch(({response}) => {
    //     console.log(response);
    // })
    res.status(200).json(mocks.folders.files);
};

exports.files = (req, res) => {
    const folderId = req.params.id;
    googleDrive.get('/files?q="' + folderId +'"+in+parents')
        .then(response => {
            res.status(200).json(response.data.files);
        })
        .catch(err => {
            res.status(500).json(err);
        });
} 

exports.file = (req, res) => {
    const fileId = req.params.id;
    const properties = ['id', 'fileExtension', 'webViewLink', 'imageMediaMetadata'];
    googleDrive.get(`/files/${fileId}`, { params: { fields: properties.join(',') } })
        .then(({data}) => {
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
            res.status(200).json(fileData);
        })
        .catch(err => res.status(500).json(err))
}


exports._files = (req, res) => {
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

