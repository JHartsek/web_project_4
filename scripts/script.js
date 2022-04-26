const postsGrid = document.querySelector('.posts-grid');
const imagePopup = document.querySelector('#focus-image-popup');
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

const titleField = document.querySelector('#title');
const linkField = document.querySelector('#image-link');

// create a post 
function createPost (postInfo) {
  const postTemplateElement = document.querySelector('.template__post');
  const postTemplate = postTemplateElement.content;
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postImageElement = postElement.querySelector('.post__image');
  postImageElement.setAttribute('src', postInfo.link);
  postImageElement.setAttribute('alt', postInfo.name);
  const postCaptionTextElement = postElement.querySelector('.post__caption-text');
  postCaptionTextElement.textContent = postInfo.name; 

  const deleteButton = postElement.querySelector('.post__delete');
  deleteButton.addEventListener('click', handleDelete);

  const image = postElement.querySelector('.post__image');
  image.addEventListener('click', handleFocusImage);

  const likeButton = postElement.querySelector('.post__caption-like');
  likeButton.addEventListener('click', handleLike);
  return postElement; 
}


// render post 
function renderPost (postInfo) {
  const postElement = createPost(postInfo);
  postsGrid.prepend(postElement); 
}


// load initial cards 
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

initialCards.forEach(renderPost);


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


// open a popup 
function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}


// close a popup 
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}


// opening the image popup 
function setImagePopupAttributes (event) {
  const selectedImage = event.target; 
  const selectedImageSrc = selectedImage.getAttribute('src'); 
  const image = document.querySelector('.popup__image');
  image.setAttribute('src', selectedImageSrc);
  const selectedImageAlt = selectedImage.getAttribute('alt');
  image.setAttribute('alt', selectedImageAlt);
  const imageCaption = document.querySelector('.popup__image-caption');
  imageCaption.textContent = selectedImageAlt;
}

function handleFocusImage (event) {
  openPopup(imagePopup);
  setImagePopupAttributes(event); 
}

function handleCloseImagePopup () {
  closePopup(imagePopup); 
}


// edit profile 
function fillOutProfileForm () {
  nameField.setAttribute('value', profileNameElement.textContent); 
  aboutField.setAttribute('value', profileAboutMeElement.textContent);
}

function handleEditProfile () {
  fillOutProfileForm();
  openPopup(editProfilePopup); 
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
  renderPost({
    name: titleField.value,
    link: linkField.value,
  });
  handleCloseAddPopup();
  addPostForm.reset();
} 
 

// set event listeners 
addPostButton.addEventListener('click', handleAddPost); 
closeAddPostButton.addEventListener('click', handleCloseAddPopup);
addPostForm.addEventListener('submit', handleCreatePost);
closeImagePopupButton.addEventListener('click', handleCloseImagePopup);
editProfileButton.addEventListener('click', handleEditProfile); 
closeProfilePopupButton.addEventListener('click', handleCloseEditPopup);
editProfileForm.addEventListener('submit', handleSaveProfileChanges);