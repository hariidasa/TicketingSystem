const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nic: {
        type: String
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    discount: {
        type: Boolean,
        required: true
    },
    enabled : {
        type: Boolean,
        required: true
    },
    loginCount : {
        type: Number,
        default: 0
    }

})

const user = module.exports = mongoose.model('User', userSchema)