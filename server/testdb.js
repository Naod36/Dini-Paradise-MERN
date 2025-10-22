const mongoose = require("mongoose");

mongoose
  .connect(
<<<<<<< HEAD
    "mongodb+srv://naodk36_db_user:LH8EdBKUPaJoyr@cluster0.wel508t.mongodb.net/dini-paradise?retryWrites=true&w=majority&appName=Cluster0"
=======
    "mongodb+srv://naodk36_db_user:LH8EdBKUPaJoyr@cluster0.wel508t.mongodb.net/dini-paradise?retryWrites=true&w=majority&appName=Cluster0",
    {
      // Add this configuration object
      serverSelectionTimeoutMS: 5000, // <-- INCREASE TIMEOUT TO 5 SECONDS (5000ms)
      // If the 5000ms is not enough, try 10000ms (10 seconds)
    }
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
  )
  .then(() => console.log("✅ Connected"))
  .catch((err) => console.error("❌ Error:", err));
