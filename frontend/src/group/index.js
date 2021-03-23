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
