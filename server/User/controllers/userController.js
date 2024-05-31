const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { email, password, firstName, lastName, age, phone } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  const hasUser = await userModel.findOne({ email });
  if (hasUser) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  } else {
    const user = await userModel.create({
      email,
      password: hashedPwd,
      firstName,
      lastName,
      age,
      phone,
    });
    const data = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
    console.log(data);
    const token = jwt.sign(data, "secret_ecom");
    res.json({
      success: true,
      message: "User created successfully ",
      token,
      user,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User does not exist", success: false });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", success: false });
  }
  const data = {
    user: {
      id: user.id,
      email: user.email,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    message: "User logged in successfully",
    token,
    user,
  });
};

module.exports = { userRegister, userLogin };
