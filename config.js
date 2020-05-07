const mongoose = require("mongoose");

const db = "mongodb+srv://addy:Whiteheartking%401005@cluster0-v6acy.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true }, err => {
    if (err) {
        console.log("MongoDB connection failed");
    } else {
        console.log("Suucessfully connected with mongo db..!");
    }
});

module.exports = mongoose;