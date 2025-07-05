const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/admin_Panel", process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});