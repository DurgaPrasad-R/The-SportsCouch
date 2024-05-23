const jwt = require("jsonwebtoken");

// middleware to authenticate user
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ message: "No token found" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};
module.exports = { fetchuser };
