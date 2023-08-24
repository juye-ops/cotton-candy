export const GetContainerList = async (projectName) => {
    try {
        const response = await fetch("/api/container/list?project=" + projectName, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = response.json();

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
        const result = response.json();

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

        const result = response.json();

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

        const result = response.json();

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

export const GenerateContainer = async (body) => {
    try {
        const response = await fetch("/api/container/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        const result = response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const UpdateContainer = async (body) => {
    try {
        const response = await fetch("/api/container/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        console.log(response);

        const result = response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const DeleteContainer = async (name) => {
    try {
        const response = await fetch("/api/container/remove?name=" + name, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}