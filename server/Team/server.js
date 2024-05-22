const express = require("express");
const cors = require("cors");
const app = express();
const teamRouter = require("./routes/teamRouter");

// middleware
require("dotenv").config();
require("./config/dbConnect");
const PORT = process.env.PORT || 9001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/teams", teamRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
