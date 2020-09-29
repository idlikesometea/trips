const googleDrive = require('../apis/googleDrive');

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