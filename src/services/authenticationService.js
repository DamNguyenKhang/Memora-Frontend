import axios from '~/api/axios';
import { LOGIN, REGISTER } from '~/constants/APIs';

export const login = async (identifier, password) => {
    try {
        const response = await axios.post(LOGIN, {
            identifier,
            password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(REGISTER, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
