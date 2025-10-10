const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    // The secure URL from Cloudinary
    src: {
      type: String,
      required: true,
    },
    // The public_id from Cloudinary, crucial for deleting the image later
    public_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
