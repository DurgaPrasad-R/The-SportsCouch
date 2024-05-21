const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");

// middleware
require("dotenv").config();
require("./config/dbConnect");
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
