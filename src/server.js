const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const port = process.env.PORT || 3000;
//midlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(routes);
//mongoose connect
mongoose.connect(
  "mongodb+srv://sir_gray:QpGY4B7IvQ4HZjA5@cluster0.ykh6t.mongodb.net/teabook?retryWrites=true&w=majority",
  (err) => {
    if (err) throw err;
    console.log("connected to MongoDB");
  }
);
app.listen(port, () => console.log("server is running"));
