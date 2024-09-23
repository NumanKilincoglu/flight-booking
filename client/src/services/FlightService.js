import apiInstance from './ApiService.js';

export const searchFlights = async (req) => {
    try {
        const response = await apiInstance.get('flights/search', { params: req.params });
        if (!response.data.success || !response?.data?.flights) return []
        return response.data.flights;
    } catch (error) {
        console.log(error?.response?.data?.error);
        return []
    }
};

export const getDestinations = async (req) => {
    try {
        const response = await apiInstance.get('flights/destinations', { params: { search: req.search } });
        if (!response.data.success || !response?.data?.destinations) return []
        return response.data.destinations;
    } catch (error) {
        console.log(error?.response?.data?.error);
        return []
    }
};

export const getAirlines = async (req) => {
    try {
        const response = await apiInstance.get('flights/airlines', { params: { page: req.page, limit: req.limit } });
        if (!response.data.success || !response?.data?.airlines) return []
        return response.data.airlines;
    } catch (error) {
        console.log(error?.response?.data?.error);
        return []
    }
};

export const bookFlight = async (req) => {
    try {
        const response = await apiInstance.post('booking/book', req.data);
        if (!response?.data?.success) return false
        return response.data;
    } catch (error) {
        console.log(error?.response?.data?.error);
        return { success: false, error: error?.response?.data?.error || 'Error' }
    }
};

export const getFlights = async (req) => {
    try {
        const response = await apiInstance.get('booking/all', { params: req.params });
        if (!response.data.success || !response?.data?.flights) return []
        return response.data;
    } catch (error) {
        console.log(error?.response?.data?.error);
        return []
    }
};

export const getAverageFarePrice = async () => {
    try {
        const response = await apiInstance.get('booking/average');
        if (!response.data.success) return 0
        return response.data.averageFarePrice;
    } catch (error) {
        console.log(error?.response?.data?.error);
        return 0
    }
};

const FlightService = {
    searchFlights,
    getDestinations,
    getAirlines,
    getFlights,
    bookFlight,
    getAverageFarePrice
}

export default FlightService