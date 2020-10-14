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
    classes:{
        type: Array,
        required: true
    }
})

const bus = module.exports = mongoose.model('Train', trainSchema)