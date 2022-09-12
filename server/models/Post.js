const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
