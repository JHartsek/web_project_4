export default class Card {
  constructor(data, templateSelector, handleCardClick, confirmDeletePopup, handleLike) {
    this._name = data.name || data.title;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes ? data.likes.length : 0;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmDeletePopup = confirmDeletePopup;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    this._postTemplateElement = document.querySelector(this.templateSelector);
    this._postTemplate = this._postTemplateElement.content;
    this._postElement = this._postTemplate.querySelector(".post").cloneNode(true);
    return this._postElement;
  }

  createPost(userId, ownerId) {
    this._post = this._getTemplate();
    this._postImageElement = this._post.querySelector(".post__image");
    this._postImageElement.setAttribute("src", this._link);
    this._postImageElement.setAttribute("alt", this._name);
    this._postCaptionTextElement = this._post.querySelector(
      ".post__caption-text"
    );
    this._postCaptionTextElement.textContent = this._name;
    this._likesElement = this._post.querySelector('.post__caption-likes');
    this._likesElement.textContent = this._likes;
    this._deleteButton = this._post.querySelector(".post__delete");
    if (ownerId !== userId) {
      this._deleteButton.remove(); 
    }
    this._setEventListeners();
    return this._post;
  }

  updateLikes(newTotal) {
    this._likesElement.textContent = newTotal;
  }

  _setEventListeners() {
    if(this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._confirmDeletePopup.open(this); 
      })
    }

    this._image = this._post.querySelector(".post__image");
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    })

    this._likeButton = this._post.querySelector(".post__caption-like__button");
    this._likeButton.addEventListener("click", this._handleLike);
  }

  handleDelete() {
    this._post.remove();
    this._post = null; 
  }
}
