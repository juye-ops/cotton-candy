import { UpdateAccess } from "apis/TokenAPIs";
import { clearUser, updateAccessToken } from "redux/slice/userSlice";

const FetchTemplate = async (dispatch, user, callback) => {
    try {
        const result_origin = await callback(user.accessToken);

        console.log(result_origin);

        if (!result_origin.detail) {
            return result_origin;
        }

        const result_refresh = await UpdateAccess(dispatch, user);

        console.log(result_refresh);

        if (!result_refresh || result_refresh.detail) {
            dispatch(clearUser());

            return;
        }

        dispatch(updateAccessToken({
            accessToken: result_refresh,
        }));

        const result_new = await callback(result_refresh);

        console.log(result_new);

        if (!result_new.detail) {
            return result_new;
        }

        dispatch(clearUser());

        return;
    } catch (e) {
        console.log(e);

        return;
    }
}

export default FetchTemplate;