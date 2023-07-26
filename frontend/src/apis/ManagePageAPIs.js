import FetchTemplate from "utils/FetchTemplate";

export const getContainerList = () => {
    return [
        {
            "project": "test project 1",
            "name": "test container 1",
            "description": "test descripion",
            "gpu": "false",
            "build": {
                "os": {
                    "name": "test os",
                    "version": "0.0.1",
                },
                "platforms": [
                    {
                        "name": "test platform",
                        "version": "0.0.1",
                    },
                    {
                        "name": "test platform 2",
                        "version": "0.0.1",
                    }
                ]
            },
            "settings": {
                "ports": [1, 2, 3, 4, 5],
                "environments": {
                    "key1": "value1",
                    "key2": "value2",
                },
            }
        },
        {
            "project": "test project 1",
            "name": "test container 2",
            "description": "test descripion",
            "gpu": "false",
            "build": {
                "os": {
                    "name": "test os",
                    "version": "0.0.1",
                },
                "platforms": [
                    {
                        "name": "test platform",
                        "version": "0.0.1",
                    },
                    {
                        "name": "test platform 2",
                        "version": "0.0.1",
                    }
                ]
            },
            "settings": {
                "ports": [1, 2, 3, 4, 5],
                "environments": {
                    "key1": "value1",
                    "key2": "value2",
                },
            }
        },
        {
            "project": "test project 1",
            "name": "test container 3",
            "description": "test descripion",
            "gpu": "false",
            "build": {
                "os": {
                    "name": "test os",
                    "version": "0.0.1",
                },
                "platforms": [
                    {
                        "name": "test platform",
                        "version": "0.0.1",
                    },
                    {
                        "name": "test platform 2",
                        "version": "0.0.1",
                    }
                ]
            },
            "settings": {
                "ports": [1, 2, 3, 4, 5],
                "environments": {
                    "key1": "value1",
                    "key2": "value2",
                },
            }
        },
        {
            "project": "test project 2",
            "name": "test container 4",
            "description": "test descripion",
            "gpu": "false",
            "build": {
                "os": {
                    "name": "test os",
                    "version": "0.0.1",
                },
                "platforms": [
                    {
                        "name": "test platform",
                        "version": "0.0.1",
                    },
                    {
                        "name": "test platform 2",
                        "version": "0.0.1",
                    }
                ]
            },
            "settings": {
                "ports": [1, 2, 3, 4, 5],
                "environments": {
                    "key1": "value1",
                    "key2": "value2",
                },
            }
        },
        {
            "project": "test project 2",
            "name": "test container 5",
            "description": "test descripion",
            "gpu": "false",
            "build": {
                "os": {
                    "name": "test os",
                    "version": "0.0.1",
                },
                "platforms": [
                    {
                        "name": "test platform",
                        "version": "0.0.1",
                    },
                    {
                        "name": "test platform 2",
                        "version": "0.0.1",
                    }
                ]
            },
            "settings": {
                "ports": [1, 2, 3, 4, 5],
                "environments": {
                    "key1": "value1",
                    "key2": "value2",
                },
            }
        }
    ];
}