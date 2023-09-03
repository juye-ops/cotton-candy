import { updateAccessToken } from 'redux/slice/userSlice';

export const UpdateAccess = async (dispatch, user) => {
    try {
        const response = await fetch("/api/user/check/refresh", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + user.refreshToken,
            }
        });

        const result = await response.json();
        
        if (!result.detail) {
            dispatch(updateAccessToken({
                accessToken: result,
            }));
        }

        return result;
    } catch (e) {
        console.log(e);

        return;
    }
}