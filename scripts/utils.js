const postsGrid = document.querySelector('.posts-grid');
const imagePopup = document.querySelector('#focus-image-popup');

// open a popup 
function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
    popupElement.addEventListener('mousedown', handleOverlayClick);
}

// close a popup 
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  popupElement.removeEventListener('mousedown', handleOverlayClick);
}

// close popup with overlay click 
function handleOverlayClick (evt) {
  if (evt.target === evt.currentTarget) {
    const popup = evt.target; 
    closePopup(popup); 
  }
}

// close a popup with esc key
function handleEscape (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleCloseImagePopup () {
    closePopup(imagePopup); 
}

function handleCloseImagePopupEsc () {
    closePopupEsc(imagePopup);
}

export { postsGrid, imagePopup, openPopup, closePopup, handleOverlayClick, handleEscape, 
  handleCloseImagePopup, handleCloseImagePopupEsc };