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
  logoImageElement, avatarImageElement, updateAvatarButton, updateAvatarForm, initialPopupImageElement, 
  saveProfileButton, saveAvatarButton, createPostButton } from '../utils/constants.js'; 
import PopupWithConfirmation from '../components/PopupWithConfirmation';


// load initail user info 
let userId; 

const apiData = {url: 'https://around.nomoreparties.co/v1/group-12', 
authorization: '382934e9-5d13-46b8-8892-13e8f13d57ff'}
const api = new Api(apiData);
const loadUserInfoPromise = api.loadUserInfo()
  .then((res) => {
    user.setUserInfo(res.name, res.about);
    avatarImageElement.src = res.avatar;
    userId = res._id;
  })

const user = new userInfo ({
  nameElementSelector: '.profile__info-name', 
  aboutElementSelector: '.profile__info-descriptor'});


// load initial cards
const imagePopup = new PopupWithImage("#focus-image-popup");
imagePopup.setEventListeners();

function createCard (data, userId, ownerId) {
  const card = new Card(data, ".template__post", (name, link) => {
    imagePopup.open(name, link);
  }, () => {
    const confirmDeletePopup = new PopupWithConfirmation("#confirm-delete-popup", (evt) => {
      evt.preventDefault();
      card.handleDelete();
      api.deletePost(data._id)
      .finally(confirmDeletePopup.close());
    })
    confirmDeletePopup.setEventListeners();
    confirmDeletePopup.open();
  },
  (evt) => {
    evt.target.classList.toggle("post__caption-like__button_active");
    if(evt.target.classList.contains("post__caption-like__button_active")) {
      api.addLike(data._id)
      .then((res) => {
        card.updateLikes(res.likes.length);
      })
    }
    else {
      api.removeLike(data._id)
      .then((res) => {
        card.updateLikes(res.likes.length)})
      }})
    const cardElement = card.createPost(ownerId, userId);
    return cardElement; 
  } 

let cardSection = null;

const getInitialCardsPromise = api.getInitialCards()
  .then((res) => {
    cardSection = new Section(
      {
        items: res,
        renderer: (data) => {
          const element = createCard(data, userId, data._id);
          cardSection.addItem(element);
        },
      },
      ".posts-grid"
    );
    cardSection.renderElements();
  })

api.renderCards([loadUserInfoPromise, getInitialCardsPromise]);

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
  renderSaving(true, saveProfileButton, "Save"); 
  const userFormData = editProfilePopup.getInputValues();
  user.setUserInfo(userFormData.name, userFormData['about-me']);
  api.editProfile(userFormData.name, userFormData['about-me'])
    .finally(() => {
      renderSaving(false, saveProfileButton, "Save");
    })
  editProfilePopup.close(); 
}


// add post
function handleAddPost() {
  addPostPopup.open();
}

function handleCreatePost(event) {
  event.preventDefault();
  renderSaving(true, createPostButton, "Create");
  const postFormData = addPostPopup.getInputValues();
  api.addPost(postFormData.title, postFormData.link)
    .then((res) => {
      const element = createCard(res, userId, userId);
      cardSection.addItem(element);
    })
    .finally(() => {
      renderSaving(false, createPostButton, "Create");
    })
  addPostPopup.close();
}


// update avatar 
function handleUpdateAvatar() {
  updateAvatarPopup.open();
}

function updateAvatar(event) {
  event.preventDefault();
  renderSaving(true, saveAvatarButton, "Save")
  const newAvatarLink = updateAvatarPopup.getInputValues()['link-avatar'];
  avatarImageElement.src = newAvatarLink;
  api.updateAvatar(newAvatarLink)
  .finally(() => {
    renderSaving(false, saveAvatarButton, "Save");
    updateAvatarPopup.close();
  });
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


// render saving screen 
function renderSaving(isSaving, button, originalButtonText) {
  if(isSaving) {
    button.textContent = "Saving..."
  }
  else {
    button.textContent = originalButtonText;
  }
}