export const GetProjectList = async () => {
    try {
        // const response = await fetch("/api/project/list/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // const result = response.json();

        // return result;

        

        return [
            {
                name: "test_01",
                description: "test desc"
            },
            {
                name: "test_02",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod autem maxime fuga nulla aut nihil necessitatibus amet sed odit tempora! Eligendi est alias debitis provident cum eius atque quod consectetur."
            }
        ]
    } catch (e) {
        console.log(e);
    }
}

export const GenerateProject = async ({ user_name, name, description }) => {
    try {
        const response = await fetch("/api/project/create/", {
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

export const ModifyProject = async ({ user_name, name, description }) => {
    try {
        const response = await fetch("/api/project/edit/", {
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

export const DeleteProject = async (name) => {
    try {
        const response = await fetch("/api/project/remove?name=" + name, {
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