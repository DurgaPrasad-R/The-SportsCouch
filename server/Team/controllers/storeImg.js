const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dnwd10wxm",
  api_key: "861138639621164",
  api_secret: "JP8X47rfkXRajGN-zgrinm73tzU",
});
const storeImg = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).send("Failed to upload image.");
    }

    // Respond with Cloudinary URL
    res.json({
      success: 1,
      image_url: result.secure_url,
    });
  });
};

module.exports = { storeImg };
