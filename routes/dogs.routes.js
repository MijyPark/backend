require("dotenv").config();
const express = require('express')
const router = require("express").Router();
const Dog = require("../models/Dog.model");
const uploader = require("../middleware/cloudinary.config");
const multer = require('multer')



router.get("/", async (req, res, next) => {
  try {
  const allDogs = await Dog.find({})
  res.status(200).json(allDogs)
} catch (error){
  console.log(error)
}
}) 

 router.post("/add", uploader.single("imageUrl"), async (req, res, next) => {
 
  const {name, age, info, location} = req.body;
  const image= req.file.path;
  try {
    const newDog = await Dog.create({name, age, info, location, image})
    res.status(201).json(newDog)
  } catch(error) {
    console.log(error)
  }
});

router.put("/", (req, res) => {
  const {_id, image} = req.body;

  Dog.findByIdAndUpdate(_id, { image }, {new: true})
    .then(updatedDog => {
      const {_id, name, age, info, location, image } = updatedDog
      res.json({ updatedDog: {_id, name, age, info, location, image} })
    })
    .catch(err => console.error(err))

})

router.delete('/:dogId', async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.dogId)
    res.status(200).json({ message: 'Dog found a home' })
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;