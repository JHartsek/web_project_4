// load stylesheets
import '../pages/index.css';

// load images 
import logoImageFile from '../images/logo.svg'; 
import avatarImageFile from '../images/avatar.jpg';
import initialPopupImageFile from '../images/latemar.jpg';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import userInfo from "../components/UserInfo.js";

import { editProfileButton, editProfileForm, addPostButton, addPostForm, titleField, linkField, initialCards, 
  classes, logoImageElement, avatarImageElement, initialPopupImageElement} from '../utils/constants.js'; 


// load initial cards
const imagePopup = new PopupWithImage("#focus-image-popup");
imagePopup.setEventListeners();

function createCard (data) {
  const card = new Card(data, ".template__post", (name, link) => {
    imagePopup.open(name, link);
  })
  const cardElement = card.createPost();
  return cardElement;
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const element = createCard(data);
      cardSection.addItem(element);
    },
  },
  ".posts-grid"
);
cardSection.renderElements();


// vaidate forms
const addPostValidation = new FormValidator(classes, addPostForm);
addPostValidation.enableValidation();
const editProfileValidation = new FormValidator(classes, editProfileForm);
editProfileValidation.enableValidation();


// create popup instances
const editProfilePopup = new PopupWithForm("#edit-profile-popup", handleSaveProfileChanges);
editProfilePopup.setEventListeners();
const addPostPopup = new PopupWithForm("#add-post-popup", handleCreatePost);
addPostPopup.setEventListeners();


// edit profile
const user = new userInfo ({
  nameElementSelector: '.profile__info-name', 
  aboutElementSelector: '.profile__info-descriptor'});

function setInitalFormFields() {
  const currentUserInfo = user.getUserInfo();
  const nameField = document.querySelector('#name');
  nameField.value = currentUserInfo.name;
  const aboutField = document.querySelector('#about-me');
  aboutField.value = currentUserInfo.about; 
}

function handleEditProfile () {
  editProfilePopup.open();
  setInitalFormFields();
  editProfileValidation.toggleSubmitButton();
}

function handleSaveProfileChanges(event) {
  event.preventDefault();
  const userFormData = editProfilePopup._getInputValues();
  user.setUserInfo(userFormData.name, userFormData['about-me']);
  editProfilePopup.close(); 
}


// add post
function handleAddPost() {
  addPostPopup.open();
}

function handleCreatePost(event) {
  event.preventDefault();
  const postFormData = addPostPopup._getInputValues();
  const element = createCard(postFormData);
  cardSection.addItem(element);
  addPostPopup.close();
  addPostValidation.toggleSubmitButton();
}

// set event listeners
addPostButton.addEventListener("click", () => {
  addPostValidation.resetValidation();
  handleAddPost();
});
editProfileButton.addEventListener("click", () => {
  editProfileValidation.resetValidation();
  handleEditProfile();
});


//set images
logoImageElement.src = logoImageFile;
avatarImageElement.src = avatarImageFile; 
initialPopupImageElement.src = initialPopupImageFile; 