import { updateAccessToken } from 'redux/slice/userSlice';

export const UpdateAccess = async (dispatch, refreshToken) => {
    try {
        const response = await fetch("/api/user/check/refresh", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + refreshToken,
            }
        });

        const result = await response.json();
        
        dispatch(updateAccessToken({
            accessToken: result,
        }));

        return result;
    } catch (e) {
        console.log(e);

        return [];
    }
}