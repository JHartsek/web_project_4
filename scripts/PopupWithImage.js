import Popup from './Popup.js'; 

export default class PopupWithImage extends Popup { 
    constructor(popupSelector) {
        super(popupSelector);
    }

    _setImagePopupAttributes = (event) => {
        const selectedImage = event.target; 
        const selectedImageSrc = selectedImage.getAttribute('src'); 
        const image = document.querySelector('.popup__image');
        image.setAttribute('src', selectedImageSrc);
        const selectedImageAlt = selectedImage.getAttribute('alt');
        image.setAttribute('alt', selectedImageAlt);
        const imageCaption = document.querySelector('.popup__image-caption');
        imageCaption.textContent = selectedImageAlt;
    }

    open = () => { 
        super.open();
        this._setImagePopupAttributes(event);
    }
}