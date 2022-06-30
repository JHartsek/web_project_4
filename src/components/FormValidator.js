export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }
    
  _showInputError = (inputElement, errorMessage) => {
    const errorMessageElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorMessageElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = " ";
    errorMessageElement.classList.remove(this._errorClass);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._formInputs.some((input) => {
      return !input.validity.valid;
    });
  };

  resetValidation = () => {
    this.toggleSubmitButton();
    this._formInputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  toggleSubmitButton = () => {
    if (this._hasInvalidInput(this._formInputs)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  };

  _setEventListeners = () => {
    this.toggleSubmitButton(this._formInputs, this._submitButton);
    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleSubmitButton(this._formInputs, this._submitButton);
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
