const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be equal or more than 3 characters"],
      trim: true,
    },
    brief: {
      type: String,
      minlength: [3, "Brief must be equal or more than 3 characters"],
      default: "No Brief...",
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    images: {
      type: [String],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, "Author is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Article", articleSchema);
