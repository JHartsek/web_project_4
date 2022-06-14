export default class userInfo {
    constructor({ nameElementSelector, aboutElementSelector}) {
        this._profileNameElement = document.querySelector(nameElementSelector);
        this._profileAboutMeElement = document.querySelector(aboutElementSelector);
        this._form = document.querySelector('.profile-edit-form');
    }

    getUserInfo () {
        this._currentUserInfo = {
            name: this._profileNameElement.textContent,
            about: this._profileAboutMeElement.textContent
        };
        return this._currentUserInfo;
    }

    setUserInfo (name, about) {
        this._profileNameElement.textContent = name;
        this._profileAboutMeElement.textContent = about;
    }
}