export default class UserInfo {
    constructor({ nameElementSelector, aboutElementSelector}) {
        this._profileNameElement = document.querySelector(nameElementSelector);
        this._profileAboutMeElement = document.querySelector(aboutElementSelector);
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