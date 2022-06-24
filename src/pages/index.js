// load stylesheets
import '../pages/index.css';

// load images 
import logoImageFile from '../images/logo.svg'; 
import initialPopupImageFile from '../images/logo.svg';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import userInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"; 

import { editProfileButton, editProfileForm, nameField, aboutField, addPostButton, addPostForm, classes, 
  logoImageElement, avatarImageElement, updateAvatarButton, updateAvatarForm, initialPopupImageElement} from '../utils/constants.js'; 


// load initail user info 
const apiData = {url: 'https://around.nomoreparties.co/v1/group-12', 
authorization: '382934e9-5d13-46b8-8892-13e8f13d57ff'}
const api = new Api(apiData);
api.loadUserInfo()
  .then((res) => {
    user.setUserInfo(res.name, res.about);
    avatarImageElement.src = res.avatar;
  })

const user = new userInfo ({
  nameElementSelector: '.profile__info-name', 
  aboutElementSelector: '.profile__info-descriptor'});


// load initial cards
const imagePopup = new PopupWithImage("#focus-image-popup");
imagePopup.setEventListeners();

function createCard (data) {
  const card = new Card(data, ".template__post", (name, link) => {
    imagePopup.open(name, link);
  }, () => {
    const confirmDeletePopup = new PopupWithForm("#confirm-delete-popup", handleDelete);
    confirmDeletePopup.open();
  })
  const cardElement = card.createPost();
  return cardElement;
}

api.getInitialCards()
  .then((res) => {
    const cardSection = new Section(
      {
        items: res,
        renderer: (data) => {
          const element = createCard(data);
          cardSection.addItem(element);
        },
      },
      ".posts-grid"
    );
    cardSection.renderElements();
  })



function handleDelete(evt) {
  evt.preventDefault();
  console.log(evt.target);
}

// vaidate forms
const addPostValidation = new FormValidator(classes, addPostForm);
addPostValidation.enableValidation();
const editProfileValidation = new FormValidator(classes, editProfileForm);
editProfileValidation.enableValidation();
const updateAvatarValidation = new FormValidator(classes, updateAvatarForm);
updateAvatarValidation.enableValidation();


// create popup instances
const editProfilePopup = new PopupWithForm("#edit-profile-popup", handleSaveProfileChanges);
editProfilePopup.setEventListeners();
const addPostPopup = new PopupWithForm("#add-post-popup", handleCreatePost);
addPostPopup.setEventListeners();
const updateAvatarPopup = new PopupWithForm("#update-avatar-popup", updateAvatar)
updateAvatarPopup.setEventListeners();


// edit profile
function setInitalFormFields() {
  const currentUserInfo = user.getUserInfo();
  nameField.value = currentUserInfo.name;
  aboutField.value = currentUserInfo.about; 
}

function handleEditProfile () {
  editProfilePopup.open();
  setInitalFormFields();
}

function handleSaveProfileChanges(event) {
  event.preventDefault();
  const userFormData = editProfilePopup.getInputValues();
  user.setUserInfo(userFormData.name, userFormData['about-me']);
  api.editProfile(userFormData.name, userFormData['about-me']);
  editProfilePopup.close(); 
}


// add post
function handleAddPost() {
  addPostPopup.open();
}

function handleCreatePost(event) {
  event.preventDefault();
  const postFormData = addPostPopup.getInputValues();
  const element = createCard(postFormData);
  const cardSection = document.querySelector('.posts-grid');
  cardSection.addItem(element);
  api.addPost(postFormData.title, postFormData.link);
  addPostPopup.close();
}


// update avatar 
function handleUpdateAvatar() {
  updateAvatarPopup.open();
}

function updateAvatar(event) {
  event.preventDefault();
  const newAvatarLink = updateAvatarPopup.getInputValues()['link-avatar'];
  avatarImageElement.src = newAvatarLink;
  api.updateAvatar(newAvatarLink);
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

const avatarDiv = document.querySelector('.profile__avatar')

avatarDiv.addEventListener("mouseover", () => {
  avatarImageElement.classList.add('profile__avatar-image_hover');
  updateAvatarButton.classList.add('profile__update-avatar-button_visible')

})

avatarDiv.addEventListener("mouseleave", () => {
  avatarImageElement.classList.remove('profile__avatar-image_hover');
  updateAvatarButton.classList.remove('profile__update-avatar-button_visible')
})

updateAvatarButton.addEventListener("click", () => {
  updateAvatarValidation.resetValidation();
  handleUpdateAvatar();
})


//set images
logoImageElement.src = logoImageFile;
initialPopupImageElement.src = initialPopupImageFile; 