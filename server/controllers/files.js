const { files } = require('../utils/database');

exports.getFiles = (req, res) => {
    res.status(200).json(files);
};
