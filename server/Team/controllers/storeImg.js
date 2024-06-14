const storeImg = (req, res) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL_USER;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({
    success: 1,
    image_url: `${apiUrl}/images/${req.file.filename}`,
  });
};

module.exports = { storeImg };
