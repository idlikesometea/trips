const axios = require('axios');

const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;

module.exports = axios.create({
    baseURL: 'https://www.googleapis.com/drive/v3',
    params: {
        key: apiKey
    }
});

