// Load environment variables
require('dotenv').config();

// Import mongoose
const mongoose = require('mongoose');

// Use local MongoDB as fallback
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/admin_Panel";
// const mongoURI ="mongodb://localhost:27017/admin_Panel";
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB successfully");
}).catch((error) => {
  console.error("❌ Error connecting to MongoDB:", error);
});
