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
    email: req.user.email,
  });
  res.json({ message: "Session created successfully", sessionId: session.id });
};

const getSessionsUser = async (req, res) => {
  const sessions = await sessionModel.find({ email: req.user.email });
  res.json({ sessions });
};

const getOtherSessions = async (req, res) => {
  const sessions = await sessionModel.find({ email: { $ne: req.user.email } });
  res.json({ sessions });
};

module.exports = { createSession, getSessionsUser, getOtherSessions };
