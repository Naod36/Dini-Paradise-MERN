const mongoose = require("mongoose");
const Image = require("./models/Image"); // Assuming ImageSchema.js is in the same directory
const cors = require("cors");
require("dotenv").config();
// --- CONFIGURATION ---
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dini-paradise";
// --- END CONFIGURATION ---

async function runMigration() {
  let connection;
  try {
    console.log("Starting MongoDB connection...");
    connection = await mongoose.connect(MONGODB_URI);
    console.log("Connection successful.");

    // 1. Find the highest existing sequence number to start from.
    // This is important in case you already have some keys like 'menu_bg_1'.
    // We'll primarily focus on filling missing keys first.

    // Get all documents where 'key' is missing (null or undefined)
    const imagesToUpdate = await Image.find({ key: { $exists: false } }).select(
      "_id"
    );

    if (imagesToUpdate.length === 0) {
      console.log(
        "No existing images found missing a 'key' field. Migration complete."
      );
      return;
    }

    console.log(
      `Found ${imagesToUpdate.length} images missing a 'key'. Starting update...`
    );

    // We start the sequence index from 1 or a number higher than any existing sequential keys
    let keyIndex = 1;

    for (const image of imagesToUpdate) {
      let uniqueKeyFound = false;
      let newKey = "";

      // Loop to find the next truly unique sequential key, just in case
      // img_1, img_2, etc., already exist from manual insertion.
      while (!uniqueKeyFound) {
        newKey = `img_${keyIndex}`;

        // Check if the generated key already exists in the collection
        const existingDoc = await Image.findOne({ key: newKey }).select("_id");

        if (!existingDoc) {
          // Key is unique, proceed with update
          uniqueKeyFound = true;
        } else {
          // Key already exists, increment index and try again
          keyIndex++;
        }
      }

      // Update the document in the database
      await Image.updateOne({ _id: image._id }, { $set: { key: newKey } });

      console.log(`Updated Document ID: ${image._id} with key: ${newKey}`);
      keyIndex++; // Move to the next index for the next document
    }

    console.log(`✅ Successfully migrated ${imagesToUpdate.length} documents.`);
    console.log(
      "Migration complete. You can now safely set 'required: true' in your ImageSchema.js file."
    );
  } catch (error) {
    console.error("❌ MIGRATION FAILED:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
    }
    process.exit(0);
  }
}

runMigration();
