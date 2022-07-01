const editProfileButton = document.querySelector(".profile__info-edit-button");

const addPostButton = document.querySelector(".profile__add-button");

const classes = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input_type_invalid",
    errorClass: "form__input-error_active",
};

const logoImageElement = document.querySelector('#logo-image');

const avatarImageElement = document.querySelector('#avatar-image');
const updateAvatarButton = document.querySelector('.profile__update-avatar-button');

const initialPopupImageElement = document.querySelector('#initial-popup-image');

export { editProfileButton, addPostButton, classes, logoImageElement, avatarImageElement, updateAvatarButton, 
  initialPopupImageElement}