const postsGrid = document.querySelector('.posts-grid');
const imagePopup = document.querySelector('#focus-image-popup');
const closeImagePopupButton = document.querySelector('#close-image-button');

// load initial cards 
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function loadInitialCards (card) {
  const postTemplate = document.querySelector('.template__post').content; 
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  postElement.querySelector('.post__image').setAttribute('src', card.link);
  postElement.querySelector('.post__image').setAttribute('alt', card.name);
  postElement.querySelector('.post__caption-text').textContent = card.name;
  const likeButton = postElement.querySelector('.post__caption-like');
  likeButton.addEventListener('click', handleLike);

  const deleteButton = postElement.querySelector('.post__delete');
  deleteButton.addEventListener('click', handleDelete);

  const image = postElement.querySelector('.post__image');
  image.addEventListener('click', handleFocusImage);
  postsGrid.append(postElement);
}

function handlePageLoad () {
  initialCards.forEach(loadInitialCards);
}

window.addEventListener('load', handlePageLoad);


// like-button
function handleLike (event) {
  event.target.classList.toggle('post__caption-like_active');
}


// delete button 
function handleDelete (event) {
  const postContent = event.target.parentElement;
  const post = postContent.parentElement;
  post.remove();
}


// opening the popup 
function handleFocusImage (event) {
  imagePopup.classList.add('popup_opened');
  const selectedImage = event.target; 
  const selectedImageSrc = selectedImage.getAttribute('src'); 
  const image = document.querySelector('.popup__image');
  image.setAttribute('src', selectedImageSrc);
  const selectedImageAlt = selectedImage.getAttribute('alt');
  image.setAttribute('alt', selectedImageAlt);
  const imageCaption = document.querySelector('.popup__image-caption');
  imageCaption.textContent = selectedImageAlt;
}

function handleCloseImagePopup () {
  imagePopup.classList.remove('popup_opened');
}


// edit profile 
const editProfileButton = document.querySelector('.profile__info-edit-button');
const editProfileForm = document.querySelector('.profile-edit-form');
const editProfilePopup = document.querySelector('#edit-profile-popup');
const closeProfilePopupButton = document.querySelector('#close-edit-button');

const nameField = document.querySelector('#name');
const aboutField = document.querySelector('#about-me');
let profileName = document.querySelector('.profile__info-name').textContent; 
let profileAboutMe = document.querySelector('.profile__info-descriptor').textContent; 

function handleEditProfile () {
  nameField.setAttribute('value', profileName); 
  aboutField.setAttribute('value', profileAboutMe);
  editProfilePopup.classList.add('popup_opened');
}

function handleCloseEditPopup () {
  editProfilePopup.classList.remove('popup_opened');
}

function handleSaveProfileChanges (event) {
  event.preventDefault();
  document.querySelector('.profile__info-name').textContent = nameField.value; 
  document.querySelector('.profile__info-descriptor').textContent = aboutField.value; 
  handleCloseEditPopup(); 
}


// add post 
const addPostButton = document.querySelector('.profile__add-button');
const addPostForm = document.querySelector('.add-post-form'); 
const addPostPopup = document.querySelector('#add-post-popup');
const closeAddPostButton = document.querySelector('#close-add-button');

const titleField = document.querySelector('#title');
const linkField = document.querySelector('#image-link');

function handleAddPost () {
  addPostPopup.classList.add('popup_opened');
}

function handleCloseAddPopup () {
  addPostPopup.classList.remove('popup_opened');
}

function handleCreatePost (event) {
  event.preventDefault();
  const postTemplate = document.querySelector('.template__post').content; 
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  postElement.querySelector('.post__image').setAttribute('src', linkField.value);
  postElement.querySelector('.post__image').setAttribute('alt', titleField.value);
  postElement.querySelector('.post__caption-text').textContent = titleField.value; 

  const deleteButton = postElement.querySelector('.post__delete');
  deleteButton.addEventListener('click', handleDelete);

  const likeButton = postElement.querySelector('.post__caption-like');
  likeButton.addEventListener('click', handleLike);
  postsGrid.prepend(postElement);
  handleCloseAddPopup();
} 

addPostButton.addEventListener('click', handleAddPost); 
closeAddPostButton.addEventListener('click', handleCloseAddPopup);
addPostForm.addEventListener('submit', handleCreatePost);
closeImagePopupButton.addEventListener('click', handleCloseImagePopup);
editProfileButton.addEventListener('click', handleEditProfile); 
closeProfilePopupButton.addEventListener('click', handleCloseEditPopup);
editProfileForm.addEventListener('submit', handleSaveProfileChanges);