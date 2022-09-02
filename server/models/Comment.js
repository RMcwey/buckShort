const {Schema, model, Types} = require("mongoose");

const commentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  originalPost: [{
    type: Types.ObjectId,
    ref: 'Post'
  }]
});


const Comment = model("Comment", commentSchema);

module.exports = Comment;
