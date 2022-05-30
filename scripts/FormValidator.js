export default class FormValidator {
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass; 
        this._formElement = formElement; 
    } 

    _showInputError = (inputElement, errorMessage) => {
        const errorMessageElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add(`${this._inputErrorClass}`);
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.add(`${this._errorClass}`);
    }

    _hideInputError = (inputElement) => {
        const errorMessageElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove(`${this._inputErrorClass}`); 
        errorMessageElement.textContent = " ";
        errorMessageElement.classList.remove(`${this._errorClass}`);
    }

    _checkInputValidity = (inputElement) => {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }
    
    _hasInvalidInput = (inputList) =>{
        return inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    _toggleSubmitButton = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(`${this._inactiveButtonClass}`);
            buttonElement.setAttribute('disabled', true);
        }
        else {
            buttonElement.classList.remove(`${this._inactiveButtonClass}`);
            buttonElement.removeAttribute('disabled'); 
        }
    }

    _setEventListeners = () => {
        const formInputs = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`)); 
        const buttonElement = this._formElement.querySelector(`${this._submitButtonSelector}`);
        this._toggleSubmitButton(formInputs, buttonElement);
        formInputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitButton(formInputs, buttonElement);
            })
        })
    }

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._setEventListeners(); 
        })
    this._setEventListeners();
    }
}