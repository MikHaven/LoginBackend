const keys = require("./config/keys.js");

const express = require("express");
//console.log(express);
const app = express();

//main().catch(err => console.log(err));

// Setup the DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

// Setup db Models
require("./model/Account");

// Setup Routes
require('./routes/authenticationRoutes')(app);

//const port = 8000;
app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});