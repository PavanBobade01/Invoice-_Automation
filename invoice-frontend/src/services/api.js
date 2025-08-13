import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // backend base URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // optional for cookies/auth
});

const handleError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        console.error('Status:', error.response.status);
        throw new Error(error.response.data || 'Something went wrong on the server.');
    } else if (error.request) {
        console.error('Network Error:', error.request);
        throw new Error('Network error. Please check your connection.');
    } else {
        console.error('Request Setup Error:', error.message);
        throw new Error('An unexpected error occurred.');
    }
};

export const saveInvoice = async (invoice) => {
    try {
        const response = await api.post('/invoice', invoice);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAllInvoices = async () => {
    try {
        const response = await api.get('/invoice');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
