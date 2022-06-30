export default class UserInfo {
  constructor({
    nameElementSelector,
    aboutElementSelector,
    avatarImageSelector,
  }) {
    this._profileNameElement = document.querySelector(nameElementSelector);
    this._profileAboutMeElement = document.querySelector(aboutElementSelector);
    this._avatarImageElement = document.querySelector(avatarImageSelector);
  }

  getUserInfo() {
    this._currentUserInfo = {
      name: this._profileNameElement.textContent,
      about: this._profileAboutMeElement.textContent,
    };
    return this._currentUserInfo;
  }

  setUserInfo(name, about) {
    this._profileNameElement.textContent = name;
    this._profileAboutMeElement.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarImageElement.src = avatar;
  }
}
