export default function postRequest(url, data) {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include"
    };
    return fetch(url, options)
}
