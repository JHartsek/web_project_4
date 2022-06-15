const editProfileButton = document.querySelector(".profile__info-edit-button");
const editProfileForm = document.querySelector(".profile-edit-form");

const nameField = document.querySelector('#name');
const aboutField = document.querySelector('#about-me');

const addPostButton = document.querySelector(".profile__add-button");
const addPostForm = document.querySelector(".add-post-form");

const initialCards = [
    {
      title: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
    {
      title: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
      title: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
      title: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
      title: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
      title: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
];

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

const initialPopupImageElement = document.querySelector('#initial-popup-image');

export { editProfileButton, editProfileForm, nameField, aboutField, addPostButton, addPostForm, initialCards, classes, 
  logoImageElement, avatarImageElement, initialPopupImageElement}