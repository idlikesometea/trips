import axios from 'axios';

export default axios.create('/api', {
    baseUrl: 'http://localhost:8000',
});