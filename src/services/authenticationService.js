import { get, post } from '~/api/http';
import {
    LOGIN,
    REGISTER,
    LOGOUT,
    CHECK_EMAIL_EXIST,
    CHECK_USERNAME_EXIST,
    RESEND_EMAIL_VERIFICATION,
} from '~/constants/APIs';

export const login = async (identifier, password) => {
    try {
        const response = await post(LOGIN, {
            identifier,
            password,
        });
        return response;
    } catch (error) {
        // if(error.response.status === 403){

        // }
        console.log(error);
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await post(REGISTER, {
            username,
            email,
            password,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const logout = async () => {
    try {
        const response = await post(LOGOUT);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const checkEmailExist = async (email) => {
    try {
        const response = await post(CHECK_EMAIL_EXIST, { email });
        return response.result;
    } catch (error) {
        console.log(error);
    }
};

export const checkUsernameExist = async (username) => {
    try {
        const response = await post(CHECK_USERNAME_EXIST, { username });
        return response.result;
    } catch (error) {
        console.log(error);
    }
};

export const sendEmailVerification = async () => {
    try {
        const response = await get(RESEND_EMAIL_VERIFICATION);
        return response;
    } catch (error) {
        console.log(error);
    }
};
