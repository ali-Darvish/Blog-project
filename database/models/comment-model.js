const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be equal or more than 3 characters"],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, "Author is required"],
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      required: [true, "Article is required"],
      ref: "Article",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
