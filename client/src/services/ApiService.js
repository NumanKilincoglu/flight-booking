import axios from 'axios';
const baseURL = process.env.REACT_APP_PROD === 'true' ? 'https://flight-booking-api-vtk1.onrender.com/api/' : 'http://localhost:3002/api/';

const apiInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default apiInstance