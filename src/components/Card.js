export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    confirmDeletePopup,
    api, 
  ) {
    this._name = data.name || data.title;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner['_id'];
    this._userId = userId;
    this._likesArray = [];
    data.likes.forEach((like) => {
      this._likesArray.push(like._id);
    })
    this._likes = data.likes ? data.likes.length : 0;
    this._isLiked = this._likesArray.includes(this._userId);
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

  createPost() {
    this._post = this._getTemplate();
    this._postImageElement = this._post.querySelector(".post__image");
    this._postImageElement.setAttribute("src", this._link);
    this._postImageElement.setAttribute("alt", this._name);
    this._postCaptionTextElement = this._post.querySelector(
      ".post__caption-text"
    );
    this._postCaptionTextElement.textContent = this._name;
    this._likeButton = this._post.querySelector(".post__caption-like__button");
    if(!this._isLiked) {
      this._likeButton.classList.remove('post__caption-like__button_active')
    }
    this._likesElement = this._post.querySelector(".post__caption-likes");
    this._likesElement.textContent = this._likes;
    this._deleteButton = this._post.querySelector(".post__delete");
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
    this._setEventListeners();
    return this._post;
  }

  _toggleLike() {
    if(this._isLiked) {
      this._likeButton.classList.add('post__caption-like__button_active');
    }
    else {
      this._likeButton.classList.remove('post__caption-like__button_active');
    }
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
    const likesArray = [];
    if (!this._isLiked) {
      this._api
        .addLike(this._id)
        .then((res) => {
          res.likes.forEach((like) => {
            likesArray.push(like._id);
          })
          this._isLiked = likesArray.includes(this._userId);
          this._toggleLike();
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
          res.likes.forEach((like) => {
            likesArray.push(like._id);
          })
          this._isLiked = likesArray.includes(this._userId);
          this._toggleLike();
          this._updateLikes(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
