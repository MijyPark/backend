const express = require('express')
const router = require("express").Router();
const Foster = require("../models/Foster.model");


router.get("/", async (req, res) => {
  try {
  const allFosters = await Foster.find({})
  res.status(200).json(allFosters)
} catch (error){
  console.log(error)
}
}) 

 router.post("/", async (req, res) => {
 
  const {name, family, housing, contacy, info} = req.body;

  try {
    const newFoster = await Foster.create({name, family, housing, contacy, info})
    res.status(201).json(newFoster)
  } catch(error) {
    console.log(error)
  }
});

  router.put("/:fosterId", (req, res) => {
  const {_id} = req.params;

  Foster.findByIdAndUpdate(_id, req.body, {new: true})
    .then(updatedFoster => {
      const {_id, name, family, housing, contacy, info } = updatedFoster
      res.json({ updatedFoster: {_id, name, family, housing, contacy, info} })
    })
    .catch(err => console.error(err))

})

router.delete('/:fosterId', async (req, res) => {
  try {
    await Foster.findByIdAndDelete(req.params.fosterId)
    res.status(200).json({ message: 'Deleted' })
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;