function ReadArticleDto({ _id, title, brief, thumbnail, createdAt }) {
  this.articleId = _id;
  this.title = title;
  this.brief = brief;
  this.thumbnail = thumbnail;
  this.createdAt = createdAt;
}

function CreateArticleDto({
  title,
  brief = "No Brief...",
  thumbnail,
  content,
  images = [],
  author,
}) {
  this.title = title;
  this.brief = brief;
  this.thumbnail = thumbnail;
  this.content = content;
  this.images = images;
  this.author = author;
}

module.exports = { ReadArticleDto, CreateArticleDto };
