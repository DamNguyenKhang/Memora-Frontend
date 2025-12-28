import axios from 'axios';
import { API_BASE_URL } from '~/constants/APIs';

export default axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (path, options = {}) => {
    const response = await axios.get(path, options);
    return response.data;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await axios.post(path, data, options);
    return response.data;
};

export const put = async (path, data = {}, options = {}) => {
    const response = await axios.put(path, data, options);
    return response.data;
};

