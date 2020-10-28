const router = require('express').Router()
const User = require('../model/User');
const {registerValidation,loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();



router.post('/register', async (req,res) => {

    //Validate User Request
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Check If Email Exist
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send("Email Already Exist")

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Creating New User Object
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await newUser.save()
        res.status(201).send({
            name: savedUser.name,
            email: savedUser.email
        })
    } catch (error) {
        res.status(400).send(err)
    }
});


router.post('/login', async (req,res) => {

        //Validate Request
        const { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message)

        //Check If Email Exist
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(400).send("Email Not Exist")

        //Check Password
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) return res.status(400).send('Invalid Password')

        //Create and assign token
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET)
        // res.header('auth-token', token).send(token);
        res.send(token)
})


module.exports = router;