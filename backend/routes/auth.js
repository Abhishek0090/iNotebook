const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Creating a User using : POST "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail,
    body("password", "Password must be of atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors then return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }
      //creating a new user
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
