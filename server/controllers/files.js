const googleDrive = require('../apis/googleDrive');

const mocks = require('../utils/mocks');
const { trips } = require('../utils/database');

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
