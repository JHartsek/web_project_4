import Popup from './Popup.js'; 

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._form = this._popupElement.querySelector('.form');
        this._submitHandler = submitHandler;
    }

    _getInputValues = () => {
        this._inputFields = document.querySelectorAll('.form__input');
        this._userInputs = {};
        this._inputFields.forEach(inputField => {
            this._userInputs[input.name] =  input.value; 
        })
        return this._userInputs;
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);
    }

    close = () => {
        super.close(); 
        this._form.reset();
    }
}