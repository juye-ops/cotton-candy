export const GetProjectList = async () => {
    try {
        const response = await fetch("/api/project/list/", {
        // const response = await fetch("http://192.168.56.1:5000/project/list/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = response.json();

        return result;
    } catch (e) {
        console.log(e);

        return [];
    }
}

export const GenerateProject = async ({ user_name, name, description }) => {
    try {
        const response = await fetch("/api/project/create/", {
        // const response = await fetch("http://192.168.56.1:5000/project/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name,
                name,
                description,
            }),
        });

        const result = response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const ModifyProject = async ({ old_name, new_name, description }) => {
    try {
        const response = await fetch("/api/project/edit/", {
        // const response = await fetch("http://192.168.56.1:5000/project/edit/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                old_name,
                new_name,
                description,
            }),
        });

        const result = response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const DeleteProject = async (name) => {
    try {
        const response = await fetch("/api/project/remove?name=" + name, {
        // const response = await fetch("http://192.168.56.1:5000/project/remove?name=" + name, {
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