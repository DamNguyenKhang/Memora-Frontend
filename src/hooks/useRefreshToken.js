import axios from '~/api/axios';
import useAuth from './useAuth';
import { REFRESH_TOKEN } from '../constants/APIs';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const userId = auth?.user?.id;
        const response = await axios.post(REFRESH_TOKEN, {
            userId,
            withCredentials: true,
        });
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                accessToken: response.data.accessToken,
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};
export default useRefreshToken;
