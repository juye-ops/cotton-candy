export const GetContainerList = async (projectName) => {
    try {
        const response = await fetch("/api/container/list/?project=" + projectName, {
        // const response = await fetch("http://192.168.56.1:5000/container/list/?project=" + projectName, {
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
        const response = await fetch("/api/version/os/", {
        // const response = await fetch("http://192.168.56.1:5000/version/os/", {
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
        // const response = await fetch("http://192.168.56.1:5000/version/os/" + os, {
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
        const response = await fetch("/api/version/framework/", {
        // const response = await fetch("http://192.168.56.1:5000/version/framework/", {
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
        // const response = await fetch("http://192.168.56.1:5000/version/framework/" + framework, {
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
        // const response = await fetch("http://192.168.56.1:5000/container/create", {
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
        // const response = await fetch("http://192.168.56.1:5000/container/edit", {
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
        const response = await fetch("/api/project/remove?name=" + name, {
        // const response = await fetch("http://192.168.56.1:5000/container/remove?name=" + name, {
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