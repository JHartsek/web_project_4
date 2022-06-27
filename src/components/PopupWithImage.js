import Popup from './Popup.js'; 

export default class PopupWithImage extends Popup { 
    constructor(popupSelector) {
        super(popupSelector);
        this._image = document.querySelector('.popup__image');
        this._imageCaption = document.querySelector('.popup__image-caption');
    }

    _setImagePopupAttributes = (name, link) => {
        this._image.setAttribute('src', link);
        this._image.setAttribute('alt', name);
        this._imageCaption.textContent = name;
    }

    open = (name, link) => { 
        super.open();
        this._setImagePopupAttributes(name, link);
    }
}