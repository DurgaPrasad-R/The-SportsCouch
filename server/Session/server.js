const express = require("express");
const cors = require("cors");
const app = express();
const sessionRouter = require("./routes/sessionRouter");

// middleware
require("dotenv").config();
require("./config/dbConnect");
const PORT = process.env.PORT || 9003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/sessions", sessionRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
