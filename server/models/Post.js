const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
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
      content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      author: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
