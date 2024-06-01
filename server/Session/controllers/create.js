const sessionModel = require("../models/sessionModel");

const createSession = async (req, res) => {
  const { name, time, date, venue, sport, team } = req.body;
  const session = await sessionModel.create({
    name,
    time,
    date: new Date(date),
    venue,
    sport,
    team,
    
  });
  res.json({ message: "Session created successfully", sessionId: session.id });
};

module.exports = { createSession };
