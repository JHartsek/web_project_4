import { openPopup, closePopup, imagePopup} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const closeImagePopupButton = document.querySelector('#close-image-button');

const editProfileButton = document.querySelector('.profile__info-edit-button');
const editProfileForm = document.querySelector('.profile-edit-form');
const editProfilePopup = document.querySelector('#edit-profile-popup');
const closeProfilePopupButton = document.querySelector('#close-edit-button');

const profileNameElement = document.querySelector('.profile__info-name'); 
const profileAboutMeElement = document.querySelector('.profile__info-descriptor'); 
const nameField = document.querySelector('#name');
const aboutField = document.querySelector('#about-me');

const addPostButton = document.querySelector('.profile__add-button');
const addPostForm = document.querySelector('.add-post-form'); 
const addPostPopup = document.querySelector('#add-post-popup');
const closeAddPostButton = document.querySelector('#close-add-button');
const createPostButton = document.querySelector('#create-post-button');

const titleField = document.querySelector('#title');
const linkField = document.querySelector('#image-link');

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  }
];

const classes = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_invalid",
  errorClass: "form__input-error_active"
};

// load initial cards 
initialCards.forEach((data) => {
  const card = new Card(data, '.template__post');
  card.renderPost();
});

// vaidate forms 
const addPostValidation = new FormValidator(classes, addPostForm);
addPostValidation.enableValidation(); 
const editProfileValidation = new FormValidator(classes, editProfileForm); 
editProfileValidation.enableValidation();

// edit profile 
function fillOutProfileForm () {
  nameField.setAttribute('value', profileNameElement.textContent); 
  aboutField.setAttribute('value', profileAboutMeElement.textContent);
}

function handleEditProfile () {
  fillOutProfileForm();
  openPopup(editProfilePopup); 
  const editProfileValidation = new FormValidator(classes, editProfileForm); 
  editProfileValidation.enableValidation();
  editProfileValidation.toggleSubmitButton();
}

function handleCloseEditPopup () {
  closePopup(editProfilePopup);
}

function updateProfileDisplay () {
  profileNameElement.textContent = nameField.value; 
  profileAboutMeElement.textContent = aboutField.value;
}

function handleSaveProfileChanges (event) {
  event.preventDefault();
  updateProfileDisplay();
  handleCloseEditPopup();
}

// add post 
function handleAddPost () {
  openPopup(addPostPopup); 
}

function handleCloseAddPopup () {
  closePopup(addPostPopup); 
}

function handleCreatePost (event) {
  event.preventDefault();
  const data = {
    name: titleField.value,
    link: linkField.value,
  };
  const card = new Card(data, '.template__post'); 
  const postElement = card.renderPost(); 
  handleCloseAddPopup();
  addPostForm.reset();
  const addPostValidation = new FormValidator(classes, addPostForm);
  addPostValidation.enableValidation(); 
  addPostValidation.toggleSubmitButton();
} 

// close image popup 
function handleCloseImagePopup () {
  closePopup(imagePopup); 
}

// set event listeners 
addPostButton.addEventListener('click', handleAddPost); 
closeAddPostButton.addEventListener('click', handleCloseAddPopup);
addPostForm.addEventListener('submit', handleCreatePost);
closeImagePopupButton.addEventListener('click', handleCloseImagePopup);
editProfileButton.addEventListener('click', handleEditProfile);
closeProfilePopupButton.addEventListener('click', handleCloseEditPopup);
editProfileForm.addEventListener('submit', handleSaveProfileChanges);