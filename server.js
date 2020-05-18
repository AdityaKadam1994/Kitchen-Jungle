const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();
const fileUpload = require("express-fileupload");

app.use(fileUpload());

//Middleware
app.use(bodyParser.json());

// DB Configg
const db = require("./config/keys").mongoURI;

//Connect Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("executed"))
  .catch((err) => console.log(err));

//Routes

app.use("/api/items", items);

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started"));
