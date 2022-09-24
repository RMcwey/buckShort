const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reviewSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  revComments: [
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

const Review = model("Review", reviewSchema);

module.exports = Review;
