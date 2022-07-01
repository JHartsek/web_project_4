import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".form");
    this._submitHandler = submitHandler;
    this._inputFields = this._form.querySelectorAll(".form__input");
    this._saveButton = this._form.querySelector(".form__save-button");
    this._originalButtonText = this._saveButton.textContent; 
  }

  getInputValues = () => {
    this._inputValues = {};
    this._inputFields.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };

  setInputValues = (data) => {
    this._inputFields.forEach(inputField => {
        inputField.value = data[inputField.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitHandler);
  }

  close = () => {
    super.close();
    this._form.reset();
  }

renderSaving(isSaving, savingText = "Saving...") {
    if (isSaving) {
      this._saveButton.textContent = savingText;
    } else {
      this._saveButton.textContent = this._originalButtonText;
    }
  }
}
