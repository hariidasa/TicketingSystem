const mongoose = require('mongoose')

const trainSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    driver:{
        type: String,
        required: true
    },
    classes:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    }
})

const train = module.exports = mongoose.model('Train', trainSchema)