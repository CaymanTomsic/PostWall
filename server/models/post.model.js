const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // "{PATH}" will be replaced with the field title, here that will be "title"
      required: [true, "{PATH} is required."],
      minlength: [2, "{PATH} must be at least {MINLENGTH} characters"],
    },
    description: {
      type: String,
    },
    primaryCategory: {
      type: String,
      required: [true, "{PATH} is required."],
      minlength: [2, "{PATH} must be at least {MINLENGTH} characters"],
    },
    secondaryCategory: {
      type: String,
      required: [true, "{PATH} is required."],
      minlength: [2, "{PATH} must be at least {MINLENGTH} characters"],
    },
    imgUrl: {
      type: String,
      required: [true, "{PATH} is required"],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/**
 * Tell mongoose what we want our model to be called
 * It will take the string and pluralize it for the
 * collection name. The Schema will enforce the
 * structure on this model when we try to create or
 * update it.
 */
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
