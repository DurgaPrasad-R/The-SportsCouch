const userModel = require("../models/userModel");

const userRegister = async (req, res) => {
  const { email, password, firstName, lastName, age, phone } = req.body;
  const user = await userModel.create({
    email,
    password,
    firstName,
    lastName,
    age,
    phone,
  });
  res.json({ message: "User created successfully ", userId: user.id });
};

module.exports = { userRegister };
