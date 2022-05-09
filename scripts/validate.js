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
    inputElement.classList.add('form__input_type_invalid');
    errorMessageElement.textContent=errorMessage;
    errorMessageElement.classList.add('form__input-error_active');

}

const hideInputError = (formElement, inputElement) => {
    const errorMessageElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove('form__input_type_invalid'); 
    errorMessageElement.textContent=" ";
    errorMessageElement.classList.remove('form__input-error_active');

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
        buttonElement.classList.add('form__save-button_disabled');
    }
    else {
        buttonElement.classList.remove('form__save-button_disabled');
    }
}

const setEventListeners = formElement => {
    const formInputs = Array.from(formElement.querySelectorAll('.form__input')); 
    const buttonElement= formElement.querySelector('.form__save-button');
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
