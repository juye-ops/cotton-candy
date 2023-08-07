const FetchTemplate = ({path, method, body}) => {
    const headers = {} 
    
    if (method !== "GET") {
        headers["Content-Type"] = "application/json";
    }

    return fetch(path, {
        method,
        headers,
        body,
    });
}

export const server = 'http://backend:5000';
export default FetchTemplate;