const {Schema, model, Types} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  posts: [{
    type: Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: Types.ObjectId,
    ref: 'Post'
  }]
});

