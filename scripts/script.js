import { postsGrid } from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";

const editProfileButton = document.querySelector(".profile__info-edit-button");
const editProfileForm = document.querySelector(".profile-edit-form");

const profileNameElement = document.querySelector(".profile__info-name");
const profileAboutMeElement = document.querySelector(
  ".profile__info-descriptor"
);
const nameField = document.querySelector("#name");
const aboutField = document.querySelector("#about-me");

const addPostButton = document.querySelector(".profile__add-button");
const addPostForm = document.querySelector(".add-post-form");

const titleField = document.querySelector("#title");
const linkField = document.querySelector("#image-link");

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
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

// load initial cards
const renderPost = (data) => {
  const card = new Card(data, ".template__post");
  const element = card.createPost();
  postsGrid.prepend(element);
};

initialCards.forEach((classes) => {
  renderPost(classes);
});

// vaidate forms
const addPostValidation = new FormValidator(classes, addPostForm);
addPostValidation.enableValidation();
const editProfileValidation = new FormValidator(classes, editProfileForm);
editProfileValidation.enableValidation();

// create popup instances
const editProfilePopup = new Popup("#edit-profile-popup");
const addPostPopup = new Popup("#add-post-popup");
const imagePopupInstance = new Popup("#focus-image-popup");

// edit profile
function fillOutProfileForm() {
  nameField.setAttribute("value", profileNameElement.textContent);
  aboutField.setAttribute("value", profileAboutMeElement.textContent);
}

function handleEditProfile() {
  fillOutProfileForm();
  editProfilePopup.open();
  editProfileValidation.toggleSubmitButton();
}

function handleCloseEditPopup() {
  editProfilePopup.close();
}

function updateProfileDisplay() {
  profileNameElement.textContent = nameField.value;
  profileAboutMeElement.textContent = aboutField.value;
}

function handleSaveProfileChanges(event) {
  event.preventDefault();
  updateProfileDisplay();
  handleCloseEditPopup();
}

// add post
function handleAddPost() {
  addPostPopup.open();
}

function handleCloseAddPopup() {
  addPostPopup.close();
}

function handleCreatePost(event) {
  event.preventDefault();
  const data = {
    name: titleField.value,
    link: linkField.value,
  };
  renderPost(data);
  handleCloseAddPopup();
  addPostForm.reset();
  addPostValidation.toggleSubmitButton();
}

// close image popup
function handleCloseImagePopup() {
  imagePopupInstance.close();
}

// set event listeners
addPostButton.addEventListener("click", handleAddPost);
addPostForm.addEventListener("submit", handleCreatePost);
editProfileForm.addEventListener('submit', handleSaveProfileChanges);
editProfileButton.addEventListener("click", handleEditProfile);

export { imagePopupInstance };
