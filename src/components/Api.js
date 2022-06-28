export default class Api {
    constructor(options) {
        this._baseUrl = options.url;
        this._authorization = options.authorization; 
    }
    
    loadUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => {
            if(res.ok) { 
                return res.json();
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
        .then((res) => {
            if(res.ok) {
                return Promise.resolve('Updated profile data saved to the server!');
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH", 
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: link,
            })
        })
        .then((res) => {
            if(res.ok) {
                return Promise.resolve('Updated avatar saved to the server!')
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addPost(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name, 
                link: link,
            })
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
         }
        )
        .catch((err) => {
            console.log(err);
        })
    }

    deletePost(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => {
            if(res.ok) {
                return Promise.resolve('Post deleted!')
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: {
                authorization: this._authorization,
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Error: ${res.status}`);
            }
    })
    .catch((err) => {
        console.log(err);
    })
    }

    renderCards(promises) {
        return Promise.all(promises);
    }
}

