// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const mongodb ="mongodb://127.0.0.1:27017/backend";

mongoose.connect(mongodb);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('connected', function() {
    console.log("Connected to mongo");
  })
  db.on('error', function(err) {
    console.log("Error connecting to mongo: ", err);
  });