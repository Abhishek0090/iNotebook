const express = require("express");
const router = express.Router();
const User = require('../models/User');


//Creating a User using : POST "/api/auth/" . Doesn't Require Auth
router.post('/', (req, res) => {
   console.log(req.body) //for reading the body of api
   const user = User(req.body)
   user.save(); //for saving our data in database
   res.send(req.body) 
});

module.exports = router;
