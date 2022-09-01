const {Schema, model, Types} = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
})