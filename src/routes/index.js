const express = require("express");
const router = express.Router();
const api = require("./api");
const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  
  };
router.use("/api",cors, api);
module.exports = router;
