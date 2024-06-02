const sessionModel = require("../models/sessionModel");

const createSession = async (req, res) => {
  const { name, time, date, venue, sport, team, teamName } = req.body;
  const session = await sessionModel.create({
    name,
    time,
    date: new Date(date),
    venue,
    sport,
    team,
    teamName,
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

const cancelSessionById = async (req, res) => {
  try {
    const session = await sessionModel.findOne({
      sessionId: req.params.sessionId,
    });
    session.active = false;
    session.cancellationReason = req.body.reason;
    await session.save();
    res.status(200).json({ message: "Session cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling session:", error);
    res.status(500).json({ message: "Failed to cancel session" });
  }
};

const joinSessionById = async (req, res) => {
  try {
    const session = await sessionModel.findOne({
      sessionId: req.params.sessionId,
    });
    session.participants.push(req.user.email);
    await session.save();
    res.status(200).json({ message: "Joined Session successfully" });
  } catch (error) {
    console.error("Error cancelling session:", error);
    res.status(500).json({ message: "Failed to cancel session" });
  }
};

module.exports = {
  createSession,
  getSessionsUser,
  getOtherSessions,
  cancelSessionById,
  joinSessionById,
};
