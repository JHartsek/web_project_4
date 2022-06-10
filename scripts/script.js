import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithFormClass.js";
import userInfo from "./UserInfo.js";

const editProfileButton = document.querySelector(".profile__info-edit-button");
const editProfileForm = document.querySelector(".profile-edit-form");

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
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, ".template__post", () => {
        const imagePopup = new PopupWithImage("#focus-image-popup");
        imagePopup.open();
      });
      const element = card.createPost();
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
const addPostPopup = new PopupWithForm("#add-post-popup", handleCreatePost);


// edit profile
const user = new userInfo ({
  nameFieldSelector: '#name', 
  aboutFeildSelector: '#about-me'});

function handleEditProfile () {
  editProfilePopup.open();
  user.setInitaluserInfo();
  editProfileValidation.toggleSubmitButton();
}

function handleSaveProfileChanges(event) {
  event.preventDefault();
  user.setUserInfo();
  editProfilePopup.close(); 
}


// add post
function handleAddPost() {
  addPostPopup.open();
}

function handleCreatePost(event) {
  event.preventDefault();
  const data = {
    name: titleField.value,
    link: linkField.value,
  };
  const card = new Card(data, ".template__post", () => {
    const imagePopup = new PopupWithImage("#focus-image-popup");
    imagePopup.open();
  });
  const element = card.createPost();
  cardSection.addItem(element);
  addPostPopup.close();
  addPostForm.reset();
  addPostValidation.toggleSubmitButton();
}

// set event listeners
addPostButton.addEventListener("click", handleAddPost);
editProfileButton.addEventListener("click", handleEditProfile);