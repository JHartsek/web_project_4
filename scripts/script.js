const editProfileButton = document.querySelector('.profile__info-edit-button');
const header = document.querySelector('.header');
const profile = document.querySelector('.profile');
const postsGrid = document.querySelector('.posts-grid');
const footer = document.querySelector('.footer');

const popup = document.querySelector('.popup__container');
const closePopupButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.profile-edit-form__save-button');

let profileName = document.querySelector('.profile__info-name').textContent; 
let profileAboutMe = document.querySelector('.profile__info-descriptor').textContent; 

const nameField = document.querySelector('#name');
const aboutField = document.querySelector('#about-me');


function handleEditProfile () {
    nameField.setAttribute('placeholder', profileName); 
    aboutField.setAttribute('placeholder', profileAboutMe);
    header.classList.add('popup');
    profile.classList.add('popup');
    postsGrid.classList.add('popup');
    footer.classList.add('popup');
    popup.classList.add('popup__container-opened');
}

editProfileButton.addEventListener('click', handleEditProfile); 

function handleClosePopup () {
    popup.classList.remove('popup__container-opened');
    header.classList.remove('popup');
    profile.classList.remove('popup');
    postsGrid.classList.remove('popup');
    footer.classList.remove('popup');
}

closePopupButton.addEventListener('click', handleClosePopup);

function handleSaveProfileChanges (event) {
    event.preventDefault();
    document.querySelector('.profile__info-name').textContent = nameField.value; 
    document.querySelector('.profile__info-descriptor').textContent = aboutField.value; 
}

saveButton.addEventListener('click', handleSaveProfileChanges);

console.log(nameField.value);
