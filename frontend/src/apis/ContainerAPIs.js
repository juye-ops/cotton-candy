export const GetContainerList = async (projectName) => {
    try {
        const response = await fetch("/api/container/list?project=" + projectName, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetOSList = async () => {
    try {
        const response = await fetch("/api/version/os", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetOSVersionList = async (os) => {
    try {
        const response = await fetch("/api/version/os/" + os, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetPlatformList = async () => {
    try {
        const response = await fetch("/api/version/framework", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetPlatformVersionList = async (framework) => {
    try {
        const response = await fetch("/api/version/framework/" + framework, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GenerateContainer = async (dispatch, user, body) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/container/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        return result;
    });

    return result;
}

export const GetContainerInfo = async (dispatch, user, name) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/container/info?name=" + name, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
        });

        const result = await response.json();

        return result;
    });

    return result;
}

export const UpdateContainer = async (body) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/container/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        return result;
    });

    return result;
}

export const DeleteContainer = async (dispatch, user, name) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/container/remove?name=" + name, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        const result = await response.json();

        return result;
    });

    return result;
}