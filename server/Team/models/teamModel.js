const { time } = require("console");
const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    required: {
      type: Number,
      required: true,
    },
    players: {
      type: Array,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
