export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.title;
    this._link = data.link;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; 
  }

  _getTemplate() {
    this._postTemplateElement = document.querySelector(this.templateSelector);
    this._postTemplate = this._postTemplateElement.content;
    this._postElement = this._postTemplate.querySelector(".post").cloneNode(true);
    return this._postElement;
  }

  createPost() {
    this._post = this._getTemplate();
    this._postImageElement = this._post.querySelector(".post__image");
    this._postImageElement.setAttribute("src", this._link);
    this._postImageElement.setAttribute("alt", this._title);
    this._postCaptionTextElement = this._post.querySelector(
      ".post__caption-text"
    );
    this._postCaptionTextElement.textContent = this._title;
    this._setEventListeners();
    return this._post;
  }

  _setEventListeners() {
    this._deleteButton = this._post.querySelector(".post__delete");
    this._deleteButton.addEventListener("click", this._handleDelete);

    this._image = this._post.querySelector(".post__image");
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    })

    this._likeButton = this._post.querySelector(".post__caption-like");
    this._likeButton.addEventListener("click", this._handleLike);
  }

  _handleDelete = () => {
    this._post.remove();
    this._post = null;
  };

  _handleLike = (event) => {
    event.target.classList.toggle("post__caption-like_active");
  };
}
