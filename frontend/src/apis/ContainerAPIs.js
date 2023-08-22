export const GetContainerList = async (projectName) => {
    try {
        // const response = await fetch("/api/container/list/?project=" + projectName, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // const result = response.json();

        // return [result];

        return [
            {
                name: "test_container_01",
                description: "test desc"
            },
            {
                name: "test_container_02",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod autem maxime fuga nulla aut nihil necessitatibus amet sed odit tempora! Eligendi est alias debitis provident cum eius atque quod consectetur."
            }
        ]
    } catch (e) {
        console.log(e);
    }
}

export const GetOSList = async () => {
    try {
        // const response = await fetch("/api/version/os/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // const result = response.json();

        // return result;

        return ['ubuntu'];
    } catch (e) {
        console.log(e);
    }
}

export const GetOSVersionList = async (os) => {
    try {
        // const response = await fetch("/api/version/os/" + os, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // const result = response.json();

        // return result;

        return [1, 2, 3, 4, 5];
    } catch (e) {
        console.log(e);
    }
}

export const GetPlatformList = async () => {
    try {
        // const response = await fetch("/api/version/framework/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // const result = response.json();

        // return result;

        return [
            {
                name: 'python',
                type: 'framework',
            },
            {
                name: 'python2',
                type: 'framework',
            },
            {
                name: 'mysql',
                type: 'database',
            },
            {
                name: 'mysql2',
                type: 'database',
            }
        ]
    } catch (e) {
        console.log(e);
    }
}

export const GetPlatformVersionList = async (framework) => {
    try {
        // const response = await fetch("/api/version/framework/" + framework, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // const result = response.json();

        // return result;

        return [1, 2, 3, 4, 5];
    } catch (e) {
        console.log(e);
    }
}

export const GenerateContainer = async (body) => {
    console.log(body);

    try {
        const response = await fetch("/api/container/create", {
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