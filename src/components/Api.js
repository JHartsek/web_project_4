export default class Api {
    constructor(options) {
        this._baseUrl = options.url;
        this._authorization = options.authorization; 
    }
    
    _checkResponse (res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }

    loadUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponse);
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
        .then(this._checkResponse);
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
        .then(this._checkResponse);
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
        .then(this._checkResponse);
    }

    deletePost(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkResponse);
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: {
                authorization: this._authorization,
            }
        })
        .then(this._checkResponse);
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            }
        })
        .then(this._checkResponse);
    }

    getInitialData() {
        return Promise.all([this.loadUserInfo(), this.getInitialCards()]);
    }
}