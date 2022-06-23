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
    }
}