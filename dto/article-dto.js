function ReadArticleDto({ _id, title, brief, thumbnail, createdAt }) {
  this.articleId = _id;
  this.title = title;
  this.brief = brief;
  this.thumbnail = thumbnail;
  this.createdAt = createdAt;
}
function DetailArticleDto({
  _id,
  title,
  brief,
  thumbnail,
  content,
  images,
  author,
  createdAt,
}) {
  this.articleId = _id;
  this.title = title;
  this.brief = brief;
  this.thumbnail = thumbnail;
  this.createdAt = createdAt;
  this.content = content;
  this.images = images;
  this.author = author;
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

function UpdateArticleDto({
  title = null,
  thumbnail = null,
  brief = null,
  content = null,
  images = [],
}) {
  if (!!title) this.title = title;
  if (!!thumbnail) this.thumbnail = thumbnail;
  if (!!brief) this.brief = brief;
  if (!!content) this.content = content;
  if (!!images.length) this.images = images;
}

module.exports = {
  ReadArticleDto,
  CreateArticleDto,
  DetailArticleDto,
  UpdateArticleDto,
};
