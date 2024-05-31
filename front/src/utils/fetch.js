export async function fetchPost(title, author, state, pages, img, category) {
    let data = {'title' : title, 'author' : author, 'state' : state, 'pages' : pages, 'img' : img, 'category' : category};
    const server = "http://localhost:3000";
    
    try {
        const response = await fetch(server + "/addBook", {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(data)
        });
        if (!response.ok) {
            return;
        } 
        const result = await response.json()
        return result;
    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }
    
}

export async function fetchGet(value) {
    const server = "http://localhost:3000";
    try {

        const response = await fetch(server + "/book/" + value, {
            method : "GET",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        const result = await response.json()
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }
}

export async function fetchGetAll(){
    const server = "http://localhost:3000";
    try {

        const response = await fetch(server + "/books", {
            method : "GET",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        let result = await response.json()
        console.log("GET ALL RESULT:", result)
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }

    
}


export async function fetchPut(value) {
    const server = "http://localhost:3000";
    try {

        const response = await fetch(server + "/book/status/" + value[1] + '/' + value[0], {
            method : "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        const result = await response.json()
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }
}

export async function fetchPutFav(value) {
    const server = "http://localhost:3000";
    try {

        const response = await fetch(server + "/book/favoris/" + value, {
            method : "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        const result = await response.json()
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }
}

export async function fetchChangeFav(value) {
    const server = "http://localhost:3000";
    try {

        const response = await fetch(server + "/book/changeFavoris/" + value, {
            method : "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        const result = await response.json()
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }
}

export async function fetchAddtoCollecFav(value) {
    const server = "http://localhost:3000";
    try {

        const response = await fetch(server + "/book/" + value, {
            method : "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        const result = await response.json()
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }
}

export async function fetchRemoveFromCollecFav(value) {
    const server = "http://localhost:3000";
    try {

        const response = await fetch(server + "/book/" + value, {
            method : "DELETE",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        const result = await response.json()
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }
}

export async function fetchGetFav(){
    const server = "http://localhost:3000";
    try {
        const response = await fetch(server + "/favoris", {
            method : "GET",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        if (!response.ok) {
            return;
        } 
        let result = await response.json()
        console.log("GET ALL RESULT:", result)
        return result;

    } catch(err) {
        console.log("Une erreur est survenue", err);
        throw Error;
    }

    
}