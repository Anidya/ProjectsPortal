export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/groups` , {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


export const load = (groupId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/getgroup/${groupId}` , {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}



export const addField = (field, groupId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/addField/${groupId}` , {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({field: ""})
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err));
}