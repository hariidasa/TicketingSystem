const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const client = require('../client')
const passport=require('passport')
const bcrypt=require('bcrypt')

//GET, PUT, DELETE Methods for Users

//GET Methods
router.get('/users', async (req, res) => {
    try {

        var userList = await UserModel.find();
        res.json(userList);
        res.status(200).json(userList)
    } catch (err) {
        res.status(500)
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const result = await UserModel.findOne({ email: req.params.id }).exec();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

//PUT Methods

router.put('/users/:id', async (req, res) => {
    const body = req.body
    try {
        var user = await UserModel.findById(req.params.id).exec()
        const discount = body.nic ? await client.validateNIC(body.nic) : false
        user.set({ ...body, discount: discount })
        var result = await user.save()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

//DELETE Methods

router.delete('/users/:id', async (req, res) => {
    try {
        const result = await UserModel.deleteOne({ email: req.params.id }).exec();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router