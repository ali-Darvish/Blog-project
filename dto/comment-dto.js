function CreateCommentDto({ text, article, author }) {
  this.text = text;
  this.article = article;
  this.author = author;
}

function UpdateCommentDto({ text }) {
  this.text = text;
}

function ReadCommentDto({ _id, text, article, author, createdAt }) {
  this.commentId = _id;
  this.text = text;
  this.article = article;
  this.author = author;
  this.createdAt = createdAt;
}

module.exports = { CreateCommentDto, ReadCommentDto, UpdateCommentDto };
