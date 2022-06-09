export default class userInfo {
    constructor({ nameFieldSelector, aboutFeildSelector}) {
        this._nameField = document.querySelector(nameFieldSelector);
        this._aboutField = document.querySelector(aboutFeildSelector);
        this._profileNameElement = document.querySelector(".profile__info-name");
        this._profileAboutMeElement = document.querySelector(".profile__info-descriptor");
        this._form = document.querySelector('.profile-edit-form');
    }

    setInitaluserInfo () {
        this._currentUserInfo = {
            name: this._profileNameElement.textContent,
            about: this._profileAboutMeElement.textContent
        };
        this._nameField.value = this._currentUserInfo.name;
        this._aboutField.value = this._currentUserInfo.about;
    }

    getUserInfo () {
        this._inputFields = this._form.querySelectorAll('.form__input');
        this._updatedUserInfo = {};
        this._inputFields.forEach(input => {
            this._updatedUserInfo[input.name] =  input.value; 
        })
        return this._updatedUserInfo;
    }

    setUserInfo () {
        this.getUserInfo();
        this._profileNameElement.textContent = this._updatedUserInfo.name;
        this._profileAboutMeElement.textContent = this._updatedUserInfo['about-me'];
    }
}