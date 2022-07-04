// load stylesheets
import "../pages/index.css";

// load images
import logoImageFile from "../images/logo.svg";
import initialPopupImageFile from "../images/logo.svg";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  editProfileButton,
  addPostButton,
  classes,
  logoImageElement,
  avatarImageElement,
  updateAvatarButton,
  initialPopupImageElement,
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const apiOptions = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "382934e9-5d13-46b8-8892-13e8f13d57ff",
    "Content-type": "application/json",
  },
};

const api = new Api(apiOptions);

// load initial user data
let userId;

const user = new UserInfo({
  nameElementSelector: ".profile__info-name",
  aboutElementSelector: ".profile__info-descriptor",
  avatarImageSelector: "#avatar-image",
});

// load initial cards
const imagePopup = new PopupWithImage("#focus-image-popup");
imagePopup.setEventListeners();

function handleDeleteCard(card) {
  api
    .deletePost(card._id)
    .then(() => {
      confirmDeletePopup.close();
      card.handleDelete();
    })
    .catch((err) => {
      console.log(err);
    });
}

const confirmDeletePopup = new PopupWithConfirmation(
  "#confirm-delete-popup",
  handleDeleteCard
);
confirmDeletePopup.setEventListeners();

function createCard(data, userId) {
  const card = new Card(
    data,
    userId,
    ".template__post",
    (name, link) => {
      imagePopup.open(name, link);
    },
    confirmDeletePopup,
    api
  );
  const cardElement = card.createPost(userId);
  return cardElement;
}

let cardSection = null;

api
  .getInitialData()
  .then(([userData, initialCards]) => {
    // load initial user info
    user.setUserInfo(userData.name, userData.about);
    user.setAvatar(userData.avatar);
    userId = userData._id;

    // load initial cards
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const element = createCard(data, userId);
          cardSection.addItem(element);
        },
      },
      ".posts-grid"
    );
    cardSection.renderElements();
  })
  .catch((err) => {
    console.log(err);
  });

// vaidate forms
const formValidators = {};
const enableValidation = (config) => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  formsList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(classes);

// create popup instances
const editProfilePopup = new PopupWithForm(
  "#edit-profile-popup",
  handleSaveProfileChanges
);
editProfilePopup.setEventListeners();
const addPostPopup = new PopupWithForm("#add-post-popup", handleCreatePost);
addPostPopup.setEventListeners();
const updateAvatarPopup = new PopupWithForm(
  "#update-avatar-popup",
  updateAvatar
);
updateAvatarPopup.setEventListeners();

// edit profile
function handleEditProfile() {
  editProfilePopup.open();
  const currentUserInfo = user.getUserInfo();
  editProfilePopup.setInputValues(currentUserInfo);
}

function handleSaveProfileChanges(event) {
  event.preventDefault();
  editProfilePopup.renderSaving(true);
  const userFormData = editProfilePopup.getInputValues();
  api
    .editProfile(userFormData.name, userFormData["about"])
    .then(() => {
      user.setUserInfo(userFormData.name, userFormData["about"]);
    })
    .then(() => {
      editProfilePopup.close();
    })
    .finally(() => {
      editProfilePopup.renderSaving(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

// add post
function handleAddPost() {
  addPostPopup.open();
}

function handleCreatePost(event) {
  event.preventDefault();
  addPostPopup.renderSaving(true);
  const postFormData = addPostPopup.getInputValues();
  api
    .addPost(postFormData.title, postFormData.link)
    .then((res) => {
      const element = createCard(res, userId);
      cardSection.addItem(element);
    })
    .then(() => {
      addPostPopup.close();
    })
    .finally(() => {
      addPostPopup.renderSaving(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

// update avatar
function handleUpdateAvatar() {
  updateAvatarPopup.open();
}

function updateAvatar(event) {
  event.preventDefault();
  updateAvatarPopup.renderSaving(true);
  const newAvatarLink = updateAvatarPopup.getInputValues()["link-avatar"];
  user.setAvatar(newAvatarLink);
  api
    .updateAvatar(newAvatarLink)
    .then(() => {
      updateAvatarPopup.close();
    })
    .finally(() => {
      updateAvatarPopup.renderSaving(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

// set event listeners
addPostButton.addEventListener("click", () => {
  formValidators["add-post-form"].resetValidation();
  handleAddPost();
});
editProfileButton.addEventListener("click", () => {
  formValidators["profile-edit-form"].resetValidation();
  handleEditProfile();
});

const avatarDiv = document.querySelector(".profile__avatar");

avatarDiv.addEventListener("mouseover", () => {
  avatarImageElement.classList.add("profile__avatar-image_hover");
  updateAvatarButton.classList.add("profile__update-avatar-button_visible");
});

avatarDiv.addEventListener("mouseleave", () => {
  avatarImageElement.classList.remove("profile__avatar-image_hover");
  updateAvatarButton.classList.remove("profile__update-avatar-button_visible");
});

updateAvatarButton.addEventListener("click", () => {
  formValidators["update-avatar-form"].resetValidation();
  handleUpdateAvatar();
});

//set images
logoImageElement.src = logoImageFile;
initialPopupImageElement.src = initialPopupImageFile;
