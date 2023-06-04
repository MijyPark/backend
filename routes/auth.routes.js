require('dotenv').config()
const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.get("/", (req, res, next) => {
  res.json("Auth good in here");
});

router.post("/signup", async (req, res) => {

  const salt = bcryptjs.genSaltSync(13);
  const passwordHash = bcryptjs.hashSync(req.body.password, salt);
  try { 
    await User.create({ email: req.body.email, password: passwordHash });
    res.status(201).json({ messsage: 'Account created' })
  } catch(err) {
      console.log(error)  
  }
  })


router.post("/login", (req, res) => {
  const  potentialUser = await.Uer.findOne({ email:req.boy.email})
  if(potentialUser) {

    if(bcryptjs.compareSync(req.body.password, potentialUser.password)) {

      const authToken = jwt.sign( {userId:potentialUser._id}, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      })
      res.json(authToken)
    } else {

    }
  } else {
  }
})
   
router.get("/verify", isAuthenticated, async(req, res) => {
  const user= await User.findById(req.playload.userId)
  res.json({message:'User is authenticated', user})
})


module.exports = router
