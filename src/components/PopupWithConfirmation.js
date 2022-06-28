import Popup from './Popup.js'; 

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._form = this._popupElement.querySelector('.form');
        this._submitHandler = submitHandler;
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);
    }

    close = () => {
        super.close(); 
    }
}