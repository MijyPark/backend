require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const http = require('http');
const url = require('url');
const express = require("express");
const bodyParser = require('body-parser');
const app = express()

require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const dogsRoutes = require("./routes/dogs.routes");
app.use("/api/dogs", dogsRoutes);           


require('./error-handling')(app)

module.exports = app;
