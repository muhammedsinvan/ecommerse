import axios from 'axios';

const instance = axios.create({
 baseURL: 'https://ecommerse-backend-six.vercel.app'
});

export default instance;
// baseURL:'http://localhost:8000'