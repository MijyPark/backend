const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");




router.post("/signup", (req, res, next) => {

  const salt = bcrypt.genSaltSync(13);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const {username, email, password} = req.body;

  if (username === "" || email === "" || password === "") {
    res.status(400).json({ message: "Provide all information" });
    return;
  }

  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      return User.create({ username, email, password: hashedPassword });
    })
    .then((createdUser) => {
      const {username, email, _id } = createdUser;

     
      const user = { username, email, _id };

      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});


router.post("/login", (req, res, next) => {
  const { username, password } = req.body;


  if (username === "" || password === "") {
    res.status(400).json({ message: "Provide username and password." });
    return;
  }

 
  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
     
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, username, email} = foundUser;

      
        const payload = { _id, username, email };


        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

 
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); 
  })

router.get("/verify", isAuthenticated, (req, res, next) => {
 
  console.log(`req.payload`, req.payload);

 
  res.status(200).json(req.payload);
 });


module.exports = router
