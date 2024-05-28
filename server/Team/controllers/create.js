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
  });
  res.json({
    message: "Team created successfully",
    success: true,
    teamId: team.id,
  });
};

module.exports = { createTeam };
