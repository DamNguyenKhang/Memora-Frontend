import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import axios from '~/api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AUTHENTICATION_PAGE } from '~/constants/pages';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const requestIntercept = axios.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error.response.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axios(prevRequest);
                    } catch (refreshError) {
                        navigate(AUTHENTICATION_PAGE, { state: { from: location }, replace: true });
                        return Promise.reject(refreshError);
                    }
                }
            },
        );
        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh, navigate, location]);

    return axios;
};
export default useAxiosPrivate;
