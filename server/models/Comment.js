const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  originalPost: [
    {
      type: Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
