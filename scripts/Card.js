import { imagePopup, openPopup } from "./utils.js";

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
        this.newPost = this._getTemplate();
        const postImageElement = this.newPost.querySelector('.post__image');
        postImageElement.setAttribute('src', this._link);
        postImageElement.setAttribute('alt', this._name);
        const postCaptionTextElement = this.newPost.querySelector('.post__caption-text');
        postCaptionTextElement.textContent = this._name; 
        this._setEventListeners(); 
        return this.newPost;    
      }

    _setEventListeners() {
        const deleteButton = this.newPost.querySelector('.post__delete');
        deleteButton.addEventListener('click', (event) => {
            this._handleDelete(event); 
        });
      
        const image = this.newPost.querySelector('.post__image');
        image.addEventListener('click', (event) => {
            this._handleFocusImage(event);
        });
      
        const likeButton = this.newPost.querySelector('.post__caption-like');
        likeButton.addEventListener('click', (event) => {
            this._handleLike(event);
        });
    }
 
    _handleDelete (event) {
        const post = event.target.closest('.post');
        post.remove();
    }

    _handleLike (event) {
        event.target.classList.toggle('post__caption-like_active');
    }

    _handleFocusImage (event) {
        openPopup(imagePopup);
        this._setImagePopupAttributes(event); 
    }

   _setImagePopupAttributes (event) {
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