'use strict'
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()
const express = require('express')
const app = express()
const login = require('./routers/login')
const register = require('./routers/register')
const user = require('./routers/user')
const admin = require('./routers/admin')
const railway = require('./routers/transroute')

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true,
         useUnifiedTopology: true }

)
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

app.use(express.static('images'))
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(railway)
app.use(login)
app.use(register)
app.use(user)
app.use(admin)

const server = app.listen(8000, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('app listening on port 8000')
});

module.exports = server;