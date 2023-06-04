require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const dogsRoutes = require("./routes/dogs.routes");
app.use("/dogs", dogsRoutes);           

/*const fosterRoutes = require("./routes/foster.routes");
app.use("/foster", fosterRoutes);  */
require('./error-handling')(app)

module.exports = app;
