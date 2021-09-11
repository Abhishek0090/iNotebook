const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Creating a User using : POST "/api/auth/" . Doesn't Require Auth
router.post(
  '/',
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail,
    body("password","Password must be of atleast 5 character").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      }).then(user => res.json(user))
      .catch(err=>{
        console.log(err)
        res.json({error: 'please enter a unique value',message : err.message})
      })
  
  }
);

module.exports = router;
