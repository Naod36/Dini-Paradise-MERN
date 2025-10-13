const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://naodk36_db_user:LH8EdBKUPaJoyr@cluster0.wel508t.mongodb.net/dini-paradise?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("✅ Connected"))
  .catch((err) => console.error("❌ Error:", err));
