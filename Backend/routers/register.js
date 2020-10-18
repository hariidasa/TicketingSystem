const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const client = require('../client')
const configs = require('../config.json')

const UserFactory = require('../service/UserFactory');
//User Registration routes

//GET Methods

router.get('/users/reg/:email', async (req, res) => {
    try {
        const encodedEmail = req.params.email;
        const email = Buffer.from(encodedEmail, 'base64').toString('ascii');

        //get user from db
        var user = await UserModel.findOne({email}).exec();
        user.set({enabled: true})

        //saving user in db
        user.save()

        //redirecting user to homepage
        res.writeHead(302, {
            'Location': configs.frontendUrl
        });
        res.end();

    } catch (err) {
        res.status(500).json(err);
    }
});

//POST Methods

router.post('/register', async (req, res) => {
    const body = req.body
    const email = body.email
    //let userFactory = new UserFactory();
    var exist = ""
    try {
        await UserModel.findOne({email: email}, (err, val) => {
            if (err) {
                console.log(err);
            } else {
                exist = val
            }
        });

        if (exist) {
            res.status(409).json({exist: true})
        } else {
            var discount = false
            if (body.nic) {
                discount = await client.validateNIC(body.nic)
            }
            var type = "regular";

            //creating user
            var user = UserFactory.createUser({...body, type, discount});

            var result = user.save()
            res.status(200).json(result)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});



module.exports = router