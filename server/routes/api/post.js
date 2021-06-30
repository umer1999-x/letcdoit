const apiPost = require("express").Router();

const bcrypt = require("bcrypt")
const {body} = require('express-validator');


const { generateP, sendMail, Adduser } = require("../../routines/routines.js")
const { inputValidation,Check_USER,Existuser } = require("../../middlewares/middlewares.js")

apiPost.post("/api/signup",
    body("email")
        .not()
        .isEmpty()
        .withMessage(`Email is empty`)
        .isEmail()
        .withMessage("Email is not valid")
        .trim(),
    body("name")
        .not()
        .isEmpty()
        .withMessage(`Name is empty`)
        .trim(),
    inputValidation,
    Existuser,
    function (req, res) {
        generateP().then(result => {
            console.log("hashed : ", result)
            req.body.password = result.hash;
            Adduser(req, res).then(data => {
                console.log('data is ', data);
                sendMail(data.email, result.pass, res);
            }).catch(err => {
                //
            });

        }).catch(err => {
            //
        })
    }
);



apiPost.post('/signin', body("email")
    .not()
    .isEmpty()
    .withMessage(`Email is empty`)
    .isEmail()
    .withMessage("Email is not valid")
    .trim(),
    inputValidation, Check_USER, (req, res) => {
        console.log(req.body);
        bcrypt.compare(req.body.password, req.body.hashedpass, (err, result) => {
            if (err) {
                res.sendStatus(404)
            }
            else {
                if (result) {
                    res.send(JSON.stringify({ success: "success" }))

                } else {
                    res.send(JSON.stringify({ error: "incorrent" }))

                }
            }
        })


    })

module.exports = apiPost;