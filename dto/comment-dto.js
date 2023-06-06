function CreateCommentDto({ text, article, author }) {
  this.text = text;
  this.article = article;
  this.author = author;
}

function ReadCommentDto({ text, article, author, createdAt }) {
  this.text = text;
  this.article = article;
  this.author = author;
  this.createdAt = createdAt;
}

module.exports = { CreateCommentDto, ReadCommentDto };
