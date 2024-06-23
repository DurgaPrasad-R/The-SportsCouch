const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

mongoose
  .connect(
    `mongodb+srv://21pa1a05e8:21pa1a05e8@sportscouch-cluster.jywzgq9.mongodb.net/sportsCouchDB`
  )
  .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 9004;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    sports: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.post("/upload", upload.single("sport"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No file uploaded", success: false });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:9004/images/${req.file.filename}`,
  });
});
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res
      .status(400)
      .json({ message: "Admin does not exist", success: false });
  }
  if (admin.password !== password) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", success: false });
  }
  res.json({
    success: true,
    message: "Admin logged in successfully",
    admin,
  });
};

const createSport = async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res
      .status(400)
      .json({ message: "Admin does not exist", success: false });
  }
  admin.sports.push({ name: req.body.name, sport: req.body.sport });
  await admin.save();
  res.json({ success: true, message: "Sport created successfully" });
};

app.post("/login", adminLogin);

app.post("/create", createSport);

app.post("/getSports", async (req, res) => {
  const email = req.body.email;
  const adminUser = await Admin.findOne({ email });
  if (!adminUser) {
    return res
      .status(400)
      .json({ message: "Admin does not exist", success: false });
  }
  res.json({ success: true, sports: adminUser.sports });
});

app.get("/getSports", async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    return res
      .status(400)
      .json({ message: "Admin does not exist", success: false });
  }
  res.json({ success: true, sports: admin.sports });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
