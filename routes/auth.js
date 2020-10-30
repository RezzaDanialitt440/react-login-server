const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = require('../middleware/auth')
const { check, validationResult } = require("express-validator");

/**
 * @swagger
 * /register:
 *  post:
 *    description: Use to register new user
 *    responses:
 *      '200':
 *        description: A successful response
 */
// router.post("/register", async (req, res) => {
//   //Validate User Request
//   const { error } = registerValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   //Check If Email Exist
//   const emailExist = await User.findOne({ email: req.body.email });
//   if (emailExist) return res.status(400).send("Email Already Exist");

//   //Hashing the password
//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(req.body.password, salt);

//   //Creating New User Object
//   const newUser = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: hashPassword,
//   });

//   try {
//     const savedUser = await newUser.save();
//     res.status(201).send({
//       name: savedUser.name,
//       email: savedUser.email,
//     });
//   } catch (error) {
//     res.status(400).send(err);
//   }
// });

router.get('/', auth, async (req, res) => {

  try {
    
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)

  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
    
  }

})



// router.post("/login", async (req, res) => {
//   //Validate Request
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   //Check If Email Exist
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send("Email Not Exist");

//   //Check Password
//   const validPass = await bcrypt.compare(req.body.password, user.password);
//   if (!validPass) return res.status(400).send("Invalid Password");

//   //Create and assign token
//   const token = jwt.sign(
//     { _id: user._id, email: user.email },
//     process.env.TOKEN_SECRET
//   );
  
//   //Set Login Response
//   let loginResp = {
//     token: token,
//     username: user.name
//   }

//   res.status(200).send(loginResp);
// });

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
