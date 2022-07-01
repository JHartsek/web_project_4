export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    confirmDeletePopup,
    api, 
  ) {
    this._name = data.name || data.title;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes ? data.likes.length : 0;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmDeletePopup = confirmDeletePopup;
    this._api = api; 
  }

  _getTemplate() {
    this._postTemplateElement = document.querySelector(this.templateSelector);
    this._postTemplate = this._postTemplateElement.content;
    this._postElement = this._postTemplate
      .querySelector(".post")
      .cloneNode(true);
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
    this._likeButton = this._post.querySelector(".post__caption-like__button");
    this._likesElement = this._post.querySelector(".post__caption-likes");
    this._likesElement.textContent = this._likes;
    this._deleteButton = this._post.querySelector(".post__delete");
    if (ownerId !== userId) {
      this._deleteButton.remove();
    }
    this._setEventListeners();
    return this._post;
  }

  _toggleLike() {
    this._likeButton.classList.toggle("post__caption-like__button_active");
  }

  _toggleIsLiked() {
    this._isLiked = this._likeButton.classList.contains("post__caption-like__button_active") ? true : false;
  }

  _updateLikes(newTotal) {
    this._likesElement.textContent = newTotal;
  }

  _setEventListeners() {
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._confirmDeletePopup.open(this);
      });
    }

    this._postImageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this.handleLike(this);
    });
  }

  handleDelete() {
    this._post.remove();
    this._post = null;
  }

  handleLike = () => {
    if (!this._isLiked) {
      this._api
        .addLike(this._id)
        .then((res) => {
          this._toggleLike();
          this._toggleIsLiked();
          return this._updateLikes(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    else if(this._isLiked) {
      this._api
        .removeLike(this._id)
        .then((res) => {
          this._toggleLike();
          this._toggleIsLiked();
          this._updateLikes(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
