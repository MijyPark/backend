const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
const fosterSchema = new Schema(
  {
    name: {
    type: String,
    },
    
   family: {
    type: Number,   

    },
    
    housing: {
      type: String,   

      },
    
    contact: {
    type: Number,
    },

    
    info: {
    type: String
   },
  
 },
  
  {
    timestamps: true
  }
)

const Foster = model("Foster", fosterSchema)

module.exports = Foster