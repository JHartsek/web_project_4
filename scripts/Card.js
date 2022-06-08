import { imagePopup } from "./utils.js";
import { imagePopupInstance } from "./script.js";

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this.templateSelector = templateSelector;
    }

    _getTemplate() {
        const postTemplateElement = document.querySelector(this.templateSelector);
        const postTemplate = postTemplateElement.content;
        const postElement = postTemplate.querySelector('.post').cloneNode(true);
        return postElement;
    }

    createPost () {
        this._post = this._getTemplate();
        const postImageElement = this._post.querySelector('.post__image');
        postImageElement.setAttribute('src', this._link);
        postImageElement.setAttribute('alt', this._name);
        const postCaptionTextElement = this._post.querySelector('.post__caption-text');
        postCaptionTextElement.textContent = this._name; 
        this._setEventListeners(); 
        return this._post;    
    }

    _setEventListeners() {
        const deleteButton = this._post.querySelector('.post__delete');
        deleteButton.addEventListener('click', this._handleDelete);
      
        const image = this._post.querySelector('.post__image');
        image.addEventListener('click', this._handleFocusImage);
      
        const likeButton = this._post.querySelector('.post__caption-like');
        likeButton.addEventListener('click', this._handleLike);
    }
    
    _handleDelete = () => {
        this._post.remove();
        this._post = null; 
    }

    _handleLike = (event) => {
        event.target.classList.toggle('post__caption-like_active');
    }

    _handleFocusImage = (event) => {
        imagePopupInstance.open(); 
        this._setImagePopupAttributes(event); 
    }

   _setImagePopupAttributes = (event) => {
        const selectedImage = event.target; 
        const selectedImageSrc = selectedImage.getAttribute('src'); 
        const image = document.querySelector('.popup__image');
        image.setAttribute('src', selectedImageSrc);
        const selectedImageAlt = selectedImage.getAttribute('alt');
        image.setAttribute('alt', selectedImageAlt);
        const imageCaption = document.querySelector('.popup__image-caption');
        imageCaption.textContent = selectedImageAlt;
    }
} 
