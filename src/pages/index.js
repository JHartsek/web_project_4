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

import { editProfileButton, editProfileForm, nameField, aboutField, addPostButton, addPostForm, initialCards, classes, 
  logoImageElement, avatarImageElement, initialPopupImageElement} from '../utils/constants.js'; 


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

api.getInitialCards()
  .then((res) => {
    console.log(res)
    function createCard (data) {
      const card = new Card(data, ".template__post", (name, link) => {
        imagePopup.open(name, link);
      })
      const cardElement = card.createPost();
      return cardElement;
    }

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
  cardSection.addItem(element);
  addPostPopup.close();
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

initialPopupImageElement.src = initialPopupImageFile; 