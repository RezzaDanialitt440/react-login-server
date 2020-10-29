const router = require("express").Router();
const verify = require('./verifyToken')
const User = require('../model/User');

router.get("/", verify, async (req, res) => {

        //Check If Users Exist in DB
        const users = await User.find()
        if (!users) return res.status(404).send("Empty Records");

        let listOfName = users.map( user => user.name)
        res.status(400).send(listOfName)
});

module.exports = router;
