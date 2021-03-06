const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const cloudinary=require('cloudinary').v2;

const port = process.env.PORT || 4000;
//midlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(routes);
cloudinary.config({ 
  cloud_name: 'sirgray', 
  api_key: '955965854556158', 
  api_secret: 'h1sPwAiJUwJfpAaKMX7F3-7zYAs' 
});
//mongoose connect
mongoose.connect(
  "mongodb+srv://sir_gray:QpGY4B7IvQ4HZjA5@cluster0.ykh6t.mongodb.net/teabook?retryWrites=true&w=majority",
  (err) => {
    if (err) throw err;
    console.log("connected to MongoDB");
  }
);
app.listen(port, () => console.log(`server is running ${port}`));
