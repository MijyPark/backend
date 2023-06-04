const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
const fosterSchema = new Schema(
  {
    name: {
    type: String,
    },
    
   family: {
    type: String,   

    },
    
    housing: {
      type: String,   

      },
      
    contact: {
    type: Number,
    },
    
    desc: {
    type: String
   },
  
 },
  
  {
    timestamps: true
  }
)

const Foster = model("Foster", fosterSchema)

module.exports = Foster