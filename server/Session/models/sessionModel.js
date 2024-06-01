const { time } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const sessionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true, // cancelled - false
    },
    cancellationReason: {
      type: String,
      default: "", // some reason
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
