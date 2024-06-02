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
  try {
    const teams = await teamModel.find({ email: req.user.email });
    res.json({ teams });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the teams",
      success: false,
      error: error.message,
    });
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

module.exports = { createTeam, getTeams, getTeamById };
