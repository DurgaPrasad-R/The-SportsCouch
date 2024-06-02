const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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
    teamName: {
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
    sessionId: {
      type: String,
      unique: true,
      default: () => `session_${uuidv4()}`, // Generates a unique identifier
    },
    participants: {
      type: [String], // Array of strings to store email addresses
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
