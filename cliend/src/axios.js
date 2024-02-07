import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ecommerse-backend-six.vercel.app', // Replace this with your actual backend URL
});

export default instance;