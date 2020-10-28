const router = require("express").Router();
const verify = require('./verifyToken')
const User = require('../model/User');

router.get("/", verify, async (req, res) => {
        //Check If Email Exist
        const emailExist = await User.findOne({email: req.user.email})
        if (emailExist) return res.status(200).send(emailExist);

//   res.json({
//     users: [
//       {
//         name: "Rezza Danial",
//       },
//       {
//         name: "Amylia Syahira",
//       },
//     ],
//   });
});

module.exports = router;
