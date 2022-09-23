const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;