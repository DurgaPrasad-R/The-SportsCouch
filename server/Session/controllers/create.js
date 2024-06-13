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
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 4;
  const sport = req.query.sport;
  console.log(sport);
  try {
    const sessions = await sessionModel
      .find({ email: req.user.email, sport: sport })
      .sort({ active: 1 })
      .skip(page * perPage)
      .limit(perPage);
    res.json({ sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getOtherSessions = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 4;
  const sport = req.query.sport;
  try {
    const sessions = await sessionModel
      .find({ email: { $ne: req.user.email }, sport: sport })
      .sort({ active: 1 })
      .skip(page * perPage)
      .limit(perPage);

    res.json({ sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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

const deleteSessionById = async (req, res) => {
  try {
    await sessionModel.findOneAndDelete({ _id: req.params.sessionId });
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ message: "Failed to delete session" });
  }
};

const deleteSessionsByTeam = async (req, res) => {
  console.log(req.params.teamId);
  try {
    await sessionModel.deleteMany({ team: req.params.teamId });
    res.status(200).json({ message: "Sessions deleted successfully" });
  } catch (error) {
    console.error("Error deleting sessions:", error);
    res.status(500).json({ message: "Failed to delete sessions" });
  }
};

module.exports = {
  createSession,
  getSessionsUser,
  getOtherSessions,
  cancelSessionById,
  joinSessionById,
  deleteSessionById,
  deleteSessionsByTeam,
};
