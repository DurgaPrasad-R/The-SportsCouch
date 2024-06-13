const teamModel = require("../models/teamModel");
const createTeam = async (req, res) => {
  const { name, available, required, players, sport, image } = req.body;
  const team = await teamModel.create({
    name,
    available,
    required,
    players,
    sport,
    image,
    email: req.user.email,
  });
  res.json({
    message: "Team created successfully",
    success: true,
    teamId: team.id,
  });
};

const getTeams = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 2;
  const sport = req.query.sport;
  try {
    const teams = await teamModel
      .find({ email: req.user.email, sport: sport })
      .skip(page * perPage)
      .limit(perPage);

    res.json({ teams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await teamModel.findOne({
      _id: req.params.teamId,
    });
    console.log(team);
    res.json(team);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the teams",
      success: false,
      error: error.message,
    });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const id = req.params.teamId;
    const team = await teamModel.findOneAndDelete({ _id: id });
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
        success: false,
      });
    }
    res.json({
      message: "Team deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the team",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { createTeam, getTeams, getTeamById, deleteTeam };
