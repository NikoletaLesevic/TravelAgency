const express = require('express');
var cors = require('cors')
var config = require("./config")
var mongoose = require("mongoose")
mongoose.connect(config.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true})

var authRoutes = require('./routes/auth')
var travelRoutes = require('./routes/travel')
var passport = require('./routes/config/passport')

var app = express();

var corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
    methods: "GET, POST, DELETE, PUT"
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(passport.initialize())

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("There was an error.")
})

app.use('/travels', travelRoutes)
app.use('/auth', authRoutes)

app.listen(config.port, () => {
    console.log(`Running on port: ${config.port}`)
})