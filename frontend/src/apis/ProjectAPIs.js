import FetchTemplate, { server } from "utils/FetchTemplate";

export const GetProjectList = async () => {
    try {
        const response = await FetchTemplate({
            path: "/project/list",
            method: "GET",
        });

        // const 
    } catch (e) {
        console.log(e);
    }
}