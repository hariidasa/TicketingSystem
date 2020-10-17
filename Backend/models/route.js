const mongoose = require('mongoose')

const routeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    }

})

const route = module.exports = mongoose.model('Route', routeSchema)