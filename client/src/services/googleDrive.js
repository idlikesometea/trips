import axios from 'axios';

const apiKey = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;

const request = axios.create({
    baseURL: 'https://www.googleapis.com/drive/v3',
    params: {
        key: apiKey
    }
});

const getFolders = () => request.get('/files', {
        params: {
            q: "mimeType='application/vnd.google-apps.folder'"
        },
        headers: {
            authorizarion: localStorage.getItem('authed')
        }
    }).then(response => {
        console.log(response.data);
    })

const getFolderFiles = folderId => request.get('/files?q="' + folderId +'"+in+parents')
    .then(({data}) => {
        if (!data.files.length) {
            throw new Error('No files found on this folder!');
        }
        
        return data.files;
    });

const fileProperties = ['id', 'fileExtension', 'webViewLink', 'imageMediaMetadata'];
const getFile = fileId => request.get(`/files/${fileId}`, { params: { fields: fileProperties.join(',') } })
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
        return fileData;
    });

export default {
    getFolders,
    getFolderFiles,
    getFile
};