const classes = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input_type_invalid",
    errorClass: "form__input-error_active"
  };

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorMessageElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(`${classes.inputErrorClass}`);
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add(`${classes.errorClass}`);

}

const hideInputError = (formElement, inputElement) => {
    const errorMessageElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(`${classes.inputErrorClass}`); 
    errorMessageElement.textContent = " ";
    errorMessageElement.classList.remove(`${classes.errorClass}`);

}

const checkInputValidity = (formElement, inputElement) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement,inputElement);
    }

}

const hasInvalidInput = (inputList) =>{
    return inputList.some(function(input) {
        return !input.validity.valid;
    })
}

const toggleSubmitButton = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${classes.inactiveButtonClass}`);
        buttonElement.setAttribute('disabled', true);
    }
    else {
        buttonElement.classList.remove(`${classes.inactiveButtonClass}`);
        buttonElement.removeAttribute('disabled'); 
    }
}

const setEventListeners = formElement => {
    const formInputs = Array.from(formElement.querySelectorAll(`${classes.inputSelector}`)); 
    const buttonElement = formElement.querySelector(`${classes.submitButtonSelector}`);
    toggleSubmitButton(formInputs, buttonElement);
    formInputs.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleSubmitButton(formInputs, buttonElement);
        })
    })
}

const enableValidation = (configObject) => {
    const formList = Array.from(document.querySelectorAll(`${configObject.formSelector}`)); 
    formList.forEach(formElement => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        })
        setEventListeners(formElement);
    })
}

enableValidation(classes);
