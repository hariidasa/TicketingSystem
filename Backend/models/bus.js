const mongoose = require('mongoose')

const busSchema = mongoose.Schema({
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

const bus = module.exports = mongoose.model('Bus', busSchema)