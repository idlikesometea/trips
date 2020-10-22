const axios = require('axios');

const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;

module.exports = axios.create({
    baseURL: 'https://www.googleapis.com/drive/v3',
    // headers: {
    //     Authorization: 'Bearer ya29.a0AfH6SMAzE1_VUEeJhZiVCzEeBFh9SYBznFo_8Xk20qkondM3_ASSwW1vGIxgdyhVOH6e1i2FPisyZGn2nmbg-o2q-86c5q5pUre8uoOADvqqRF83w2mT_joSbQjuEvccGfrMuRPDwKTwPD6Y3_P3QzlarG1Fz6wwx_e6b32z1Q'
    // },  
    params: {
        key: apiKey
    }
});

