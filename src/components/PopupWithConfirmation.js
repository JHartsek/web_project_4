import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".form");
    this._submitHandler = submitHandler;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    });
  }
}
