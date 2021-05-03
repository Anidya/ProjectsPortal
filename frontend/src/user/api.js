export const list = (teacherId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/mentor/${teacherId}` , {
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

export const updateDetailsFiles = (groupId, group) => {
    return fetch(`${process.env.REACT_APP_API_URL}/updategroupfiles/${groupId}` , {
        method: "PUT",
        headers: {
            Accept: "application/json"
            // "Content-type": "application/json"
        },
        body: group
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const createGroup = group => {
    return fetch(`${process.env.REACT_APP_API_URL}/creategroup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(group)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
};
