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

export const updateDetails = (groupId, group) => {
    console.log("group",group);
    return fetch(`${process.env.REACT_APP_API_URL}/updategroup/${groupId}` , {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(group)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}