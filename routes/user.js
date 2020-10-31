const router = require("express").Router();
const User = require("../model/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')


router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Password must more than 12 Alphanumric character and Symbol"
    )
      .isLength({ min: 12 })
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-zA-Z]).{12,}$/
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //check if user already registered
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      } else {
        //create new user instance
        user = new User({
          name,
          email,
          password,
        });

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        //save user in db
        await user.save();

        const payload = {
          user: {
            id: user.id,
            name: user.name
          },
        };

        //will hide later
        const secretKey = 'secret'

        jwt.sign(
          payload,
          secretKey,
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/retrieve-all", auth, async (req, res) => {
  try {
    // Check If Users Exist in DB
    const users = await User.find();
    if (!users) return res.status(404).send("Empty Records");

    let responses = [];

    users.forEach((user) => {
      let resp = {
        _id: user._id,
        name: user.name,
      };

      responses.push(resp);
    });

    res.status(200).send(responses);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
