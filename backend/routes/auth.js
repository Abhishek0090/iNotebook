const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "AbhishekisBadB$oy";

//ROUTES 1 : Creating a User using : POST "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail(),
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

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating a new user

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);
// ROUTES 2: Authenticate a User using : POST "/api/auth/login" . No login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Password : Cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are errors then return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data,JWT_SECRET);
      let success = true;
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal  Server Error Occured Some Error Occured");
    }
  }
);

// ROUTES 3: Get Login  User details using : POST "/api/auth/getuser" .login required
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select('-password');
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal  Server Error Occured Some Error Occured");
    }
  }
);
module.exports = router;
