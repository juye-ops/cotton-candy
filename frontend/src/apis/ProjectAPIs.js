import FetchTemplate from "utils/FetchTemplate";

export const GetProjectList = async (dispatch, user) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/project/list", {
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

export const GetProjectContainers = async (dispatch, user, projectName) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/project/len?name=" + projectName, {
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

export const GenerateProject = async (dispatch, user, body) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/project/create", {
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

export const ModifyProject = async (dispatch, user, body) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/project/edit", {
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

export const DeleteProject = async (dispatch, user, name) => {
    const result = FetchTemplate(dispatch, user, async (accessToken) => {
        const response = await fetch("/api/project/remove?name=" + name, {
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