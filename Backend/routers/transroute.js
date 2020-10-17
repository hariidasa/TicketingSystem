const express = require('express')
const router = express.Router()
const routeModel = require('../models/route')
const trainModel = require('../models/train')
const busModel = require('../models/bus')
const classModel = require('../models/classes')
const scheduleModel = require('../models/schedule')
const reservationModel = require('../models/reservation')
const client = require('../client')
const configs = require('../config.json')
const qrcode = require('qrcode');
const driverModel = require('../models/driver')

// router.get('/transroute/bookings', async (req, res) => {
//     try {
//         const result = await reservationModel.find()
//         res.status(200).json(result)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });
//
// router.post('/transroute/booking', async (req, res) => {
//
//     const query = { name: req.body.name }
//     reservationModel.find(query, (err, route) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json(err);
//         } else {
//             if (route.length != 0) {
//                 res.status(200).json({ driverExist: true });
//             } else {
//
//                 let routes = new reservationModel(req.body);
//                 routes.save(err => {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).json(err);
//                     } else {
//                         res.status(200).json({ driverExist: false });
//                     }
//                 });
//
//             }
//
//         }
//     });
// });
//
// router.put('/transroute/booking', async (req, res) => {
//
//     const body = {
//         name: req.body.station,
//     }
//     const query = { name: req.body.name }
//     await reservationModel.find(query, async (err, route) => {
//
//         if (err) {
//             console.log(err);
//             res.status(500).json(err);
//         } else {
//             var found = null
//             found = await route[0].route.find(function (data) {
//                 return data.name === req.body.station;
//             });
//
//             if (found) {
//                 res.status(200).json({ stationExist: true });
//             } else {
//                 reservationModel.updateOne(query, { $push: { route: body } }, (err) => {
//                     if (err) {
//                         console.log(err)
//                         res.status(500).json(err);
//                     } else {
//                         res.status(200).json({ stationExist: false });
//                     }
//                 })
//             }
//
//         }
//     })
//
// });


router.get('/transroute/trains', async (req, res) => {
    try {
        const result = await trainModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/transroute/train', async (req, res) => {

    const query = { name: req.body.name }
    trainModel.find(query, (err, route) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (route.length != 0) {
                res.status(200).json({ driverExist: true });
            } else {

                let routes = new trainModel(req.body);
                routes.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ driverExist: false });
                    }
                });

            }

        }
    });
});
router.get('/transroute/classes', async (req, res) => {
    try {
        const result = await classModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/transroute/train', async (req, res) => {

    const body = {
        name: req.body.station,
    }
    const query = { name: req.body.name }
    await trainModel.find(query, async (err, route) => {

        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            var found = null
            found = await route[0].route.find(function (data) {
                return data.name === req.body.station;
            });

            if (found) {
                res.status(200).json({ stationExist: true });
            } else {
                trainModel.updateOne(query, { $push: { route: body } }, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ stationExist: false });
                    }
                })
            }

        }
    })

});

router.delete('/transroute/train', async (req, res) => {

    const query = { name: req.body.name }
    trainModel.deleteOne(query, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json({ status: true });
        }
    });
});

router.get('/transroute/buses', async (req, res) => {
    try {
        const result = await busModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/transroute/bus', async (req, res) => {

    const query = { name: req.body.name }
    busModel.find(query, (err, route) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (route.length != 0) {
                res.status(200).json({ driverExist: true });
            } else {

                let routes = new busModel(req.body);
                routes.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ driverExist: false });
                    }
                });

            }

        }
    });
});

router.put('/transroute/bus', async (req, res) => {

    const body = {
        name: req.body.station,
    }
    const query = { name: req.body.name }
    await busModel.find(query, async (err, route) => {

        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            var found = null
            found = await route[0].route.find(function (data) {
                return data.name === req.body.station;
            });

            if (found) {
                res.status(200).json({ stationExist: true });
            } else {
                trainModel.updateOne(query, { $push: { route: body } }, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ stationExist: false });
                    }
                })
            }

        }
    })

});

router.delete('/transroute/bus', async (req, res) => {

    const query = { name: req.body.name }
    busModel.deleteOne(query, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json({ status: true });
        }
    });
});

router.get('/transroute/drivers', async (req, res) => {
    try {
        const result = await driverModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/transroute/driver', async (req, res) => {

    const query = { name: req.body.name }
    driverModel.find(query, (err, route) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (route.length != 0) {
                res.status(200).json({ driverExist: true });
            } else {

                let routes = new driverModel(req.body);
                routes.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ driverExist: false });
                    }
                });

            }

        }
    });
});

router.put('/transroute/driver', async (req, res) => {

    const body = {
        name: req.body.station,
    }
    const query = { name: req.body.name }
    await driverModel.find(query, async (err, route) => {

        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            var found = null
            found = await route[0].route.find(function (data) {
                return data.name === req.body.station;
            });

            if (found) {
                res.status(200).json({ stationExist: true });
            } else {
                driverModel.updateOne(query, { $push: { route: body } }, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ stationExist: false });
                    }
                })
            }

        }
    })

});

router.delete('/transroute/driver', async (req, res) => {

    const query = { name: req.body.name }
    driverModel.deleteOne(query, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json({ status: true });
        }
    });
});

router.get('/transroute/routes', async (req, res) => {
    try {
        const result = await routeModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/route/:id', async (req, res) => {
    try {
        const result = await routeModel.findOne({ '_id': req.params.id })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/buses', async (req, res) => {
    try {
        const result = await trainModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/buses/:route', async (req, res) => {
    try {
        const route = await routeModel.findOne({ '_id': req.params.route })
        const result = await trainModel.find({ route: route.name })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/classes', async (req, res) => {
    try {
        const result = await classModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/schedules', async (req, res) => {
    try {
        const result = await scheduleModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/transroute/reservations', async (req, res) => {
    try {
        const body = req.body
        var reservation = new reservationModel(body)
        var result = await reservation.save()

        // send email
        const img = await qrcode.toDataURL(configs.frontendUrl + "/ticket/" + result._id);
        var base64Data = img.replace(/^data:image\/png;base64,/, "");
        await require("fs").writeFile("images/" + result._id + ".png", base64Data, 'base64', function (err) {
            console.log(err);
        });

        const html = '<html><body><h2><u>Reservation Slip</u></h2><p>Reference No : <b> ' + result._id + ' </b><br><br>From <b> ' + body.from + ' </b> to <b> ' + body.to + ' </b><br>' + 'Date :<b> ' + body.date + ' </b> Time :<b> ' + body.time + ' </b><br>Train : <b>' + body.train + ' </b> Class: <b> ' + body.trainClass + ' </b><br>Quantity : <b> ' + body.qty + ' </b></p><p>Total : <b> ' + body.total + ' LKR</b></p><br><img src="cid:123"/></body></html>'
        client.sendReservationEmail({
            ...body,
            html: html,
            subject: 'Railway e-Ticket',
            path: 'images/' + result._id + '.png'
        })

        // send text message
        if (body.phone) {
            client.sendTextMessage({ ...body, reservationID: result._id })
        }

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/reservations', async (req, res) => {
    try {
        const result = await reservationModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/users/:user/reservations', async (req, res) => {
    try {
        const result = await reservationModel.find({ user: req.params.user })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/reservations/buses/:bus/class/:trainClass/date/:date/time/:time', async (req, res) => {
    try {
        const train = req.params.train
        const trainClass = req.params.trainClass
        const date = req.params.date
        const time = req.params.time
        const result = await reservationModel.find({ train: train, trainClass: trainClass, date: date, time: time })
        var bookings = 0
        result.map(item => bookings += item.qty)
        if (result.length <= 0) {
            res.status(200).json({ bookings: 0 })
        } else {
            res.status(200).json({ bookings })
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/transroute/reservations/:id', async (req, res) => {
    try {
        const result = await reservationModel.findOne({ _id: req.params.id }).exec()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/transroute/reservations/:id', async (req, res) => {
    try {
        const result = await reservationModel.deleteOne({ _id: req.params.id }).exec()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/transroute/route', async (req, res) => {

    const query = { name: req.body.name }
    routeModel.find(query, (err, route) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (route.length != 0) {
                res.status(200).json({ routeExist: true });
            } else {

                let routes = new routeModel(req.body);
                routes.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ routeExist: false });
                    }
                });

            }

        }
    });
});

router.put('/transroute/route', async (req, res) => {

    const body = {
        name: req.body.station,
        fair: req.body.fair
    }
    const query = { name: req.body.name }
    await routeModel.find(query, async (err, route) => {

        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            var found = null
            found = await route[0].route.find(function (data) {
                return data.name === req.body.station;
            });

            if (found) {
                res.status(200).json({ stationExist: true });
            } else {
                routeModel.updateOne(query, { $push: { route: body } }, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({ stationExist: false });
                    }
                })
            }

        }
    })

});

router.delete('/transroute/route', async (req, res) => {

    const query = { name: req.body.name }
    routeModel.deleteOne(query, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json({ status: true });
        }
    });
});

router.post("/transroute/reservations/monthly", (req, res) => {

    const yearMonth = req.body.year + "-" + req.body.month
    const query = { "date": new RegExp(yearMonth, "i") }
    reservationModel.find(query, (err, reservation) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(reservation)
        }
    });
});

router.post("/transroute/reservations/yearly", (req, res) => {

    const query = { "date": new RegExp(req.body.year, "i") }
    reservationModel.find(query, (err, reservation) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(reservation)
        }
    });
});

module.exports = router