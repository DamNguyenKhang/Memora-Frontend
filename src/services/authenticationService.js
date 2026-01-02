import axios from '~/api/axios';
import { LOGIN, REGISTER, LOGOUT, CHECK_EMAIL_EXIST, CHECK_USERNAME_EXIST } from '~/constants/APIs';

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

export const logout = async () => {
    try {
        const response = await axios.post(LOGOUT);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const checkEmailExist = async (email) => {
    try {
        const response = await axios.post(CHECK_EMAIL_EXIST, { email });
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
};

export const checkUsernameExist = async (username) => {
    try {
        const response = await axios.post(CHECK_USERNAME_EXIST, { username });
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
};
