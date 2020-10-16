const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const driver = module.exports = mongoose.model('Driver', driverSchema)