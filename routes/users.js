var express = require('express');
var router = express.Router();
//var User = require('../models/User');
var Pool = require('../config/mysql');

// Mongo 
// router.post('/add', (req, res) => {
//     var newUser = new User({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         birthDate: req.body.birthDate
//     });

//     newUser.save((err) => {
//         if (err) {
//             res.json({
//                 success: false,
//                 message: "User is not added."
//             });
//         } else {
//             res.send({
//                 success: true,
//                 message: "User successfully added."
//             });
//         }
//     });
// });

router.post('/register', (req, res) => {
    var newUser = {
        id: null,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        city: req.body.city,
        country: req.body.country,
        gendreId: req.body.gendreId
    };

    Pool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            res.json({
                success: false,
                errInfo: err
            });
        } else {
            conn.query("INSERT INTO user SET ?", newUser, (err, result) => {
                conn.release();
                if (err) {
                    res.json({
                        success: false,
                        errInfo: err
                    });
                } else {
                    res.json({
                        success: true,
                        errInfo: null,
                        userId: result.insertId
                    });
                }

            });
        }
    });
});

router.post('/login', (req, res) => {
    var user = {
        password: req.body.password,
        email: req.body.email
    };

    Pool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            res.json({
                success: false,
                errInfo: err
            });
        } else {
            conn.query("SELECT * FROM user WHERE email LIKE ?", user.email, (err, result) => {
                conn.release();
                if (err) {
                    res.json({
                        success: false,
                        errInfo: err
                    });
                } else {
                    if (result.length === 0) {
                        res.json({
                            success: false,
                            errInfo: "No user with entered email in database."
                        });
                    } else if (result[0].password !== user.password) {
                        res.json({
                            success: false,
                            errInfo: "Wrong password."
                        });
                    } else {
                        res.json({
                            success: true,
                            errInfo: null
                        });
                    }
                }

            });
        }
    });
});

module.exports = router;