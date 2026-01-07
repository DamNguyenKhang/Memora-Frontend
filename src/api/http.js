import axios from 'axios';
import { API_BASE_URL } from '~/constants/APIs';

const http = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (path, options = {}) => {
    const response = await http.get(path, options);
    return response.data;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await http.post(path, data, options);
    return response.data;
};

export const put = async (path, data = {}, options = {}) => {
    const response = await http.put(path, data, options);
    return response.data;
};

export default http;

