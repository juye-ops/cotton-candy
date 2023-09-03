import FetchTemplate from "utils/FetchTemplate";

export const TrySignup = async (username, password) => {
    try {
        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            })
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);

        return [];
    }
}

export const TrySignin = async (username, password) => {
    try {
        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        const response = await fetch("/api/user/signin", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);

        return [];
    }
}

export const SignoutUser = async (dispatch, user) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/user/signout", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        const result = await response.json();

        return result;
    });

    return result;
}

export const GetUserName = async (dispatch, user) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/user/test", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        const result = await response.json();

        return result;
    });

    return result;
}