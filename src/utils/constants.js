const editProfileButton = document.querySelector(".profile__info-edit-button");
const editProfileForm = document.querySelector(".profile-edit-form");

const nameField = document.querySelector('#name');
const aboutField = document.querySelector('#about-me');

const addPostButton = document.querySelector(".profile__add-button");
const addPostForm = document.querySelector(".add-post-form");

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
const updateAvatarForm = document.querySelector('.update-avatar-form');

const initialPopupImageElement = document.querySelector('#initial-popup-image');

export { editProfileButton, editProfileForm, nameField, aboutField, addPostButton, addPostForm, classes, 
  logoImageElement, avatarImageElement, updateAvatarButton, updateAvatarForm, initialPopupImageElement}