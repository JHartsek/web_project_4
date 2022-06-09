export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
    }

    open () {
        this._popupElement.classList.add('popup_opened');
        this.setEventListeners();
    }

    close () {
        this._popupElement.classList.remove('popup_opened');
        this.removeEventListeners();
    }

    _handleOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close(); 
        }
    }
  
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close(); 
        }
    }

    setEventListeners () { 
        this._closeButton.addEventListener('click', () => {
            this.close();
            });
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.addEventListener('mousedown', this._handleOverlayClick);
    }

    removeEventListeners = () => {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.removeEventListener('mousedown', this._handleEscClose);
    }
}
  