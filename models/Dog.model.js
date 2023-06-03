const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const dogSchema = new Schema(
  { 
    name: {
    type: String,
    },

    age: {
    type: Number
          },

    info: {
        type: String,
     },
    location: {
      type: String,
     },

    image: {
      type: String,
    }
    
  }, 
  {
    timestamps: true
  }
)


const Dog = model('Dog', dogSchema)

module.exports = Dog