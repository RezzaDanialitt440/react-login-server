const router = require("express").Router();
const verify = require('./verifyToken')
const User = require('../model/User');

router.get("/", verify, async (req, res) => {

        //Check If Users Exist in DB
        const users = await User.find()
        if (!users) return res.status(404).send("Empty Records");

        let responses = []

        users.forEach((user) => {
          let resp = {
            _id: user._id,
            name: user.name,
          };

          responses.push(resp);
        });
        
        res.status(200).send(responses)
});

module.exports = router;
