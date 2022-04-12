const editProfileButton = document.querySelector('.profile__info-edit-button');
const editProfileForm = document.querySelector('.profile-edit-form');

const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__info-name').textContent; 
let profileAboutMe = document.querySelector('.profile__info-descriptor').textContent; 

const nameField = document.querySelector('#name');
const aboutField = document.querySelector('#about-me');

function handleEditProfile () {
    nameField.setAttribute('value', profileName); 
    aboutField.setAttribute('value', profileAboutMe);
    popup.classList.add('popup_opened');
}

function handleClosePopup () {
    popup.classList.remove('popup_opened');
}

function handleSaveProfileChanges (event) {
    event.preventDefault();
    document.querySelector('.profile__info-name').textContent = nameField.value; 
    document.querySelector('.profile__info-descriptor').textContent = aboutField.value; 
    handleClosePopup(); 
}

editProfileButton.addEventListener('click', handleEditProfile); 
closePopupButton.addEventListener('click', handleClosePopup);
editProfileForm.addEventListener('submit', handleSaveProfileChanges);

