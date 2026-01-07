import { post } from '~/api/http';
import useAuth from './useAuth';
import { REFRESH_TOKEN } from '../constants/APIs';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const userId = auth?.user?.id;
        const response = await post(REFRESH_TOKEN, {
            userId,
            withCredentials: true,
        });
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.result.accessToken);
            return {
                ...prev,
                accessToken: response.result.accessToken,
            };
        });
        return response.result.accessToken;
    };
    return refresh;
};
export default useRefreshToken;
