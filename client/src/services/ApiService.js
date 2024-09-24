import axios from 'axios';

// Eger productionda ise ilgili REST API URL'sinin ayarlanmasi 
const baseURL = process.env.REACT_APP_PROD === 'true' ? 'https://flight-booking-rest.onrender.com/api/' : 'http://localhost:3002/api/';

// Axios api instance tanimlamasi
const apiInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default apiInstance