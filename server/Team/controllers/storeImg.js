const storeImg = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({
    success: 1,
    image_url: "http://localhost:3001/images/" + `${req.file.filename}`,
  });
};

module.exports = { storeImg };