const apiPost = require("express").Router();

const bcrypt = require("bcrypt")
const {body} = require('express-validator');


const { generateP, sendMail } = require("../../routines/routines.js")
const { inputValidation,Check_USER,Existuser } = require("../../middlewares/middlewares.js")

apiPost.post("/signup",
    body("email")
        .not()
        .isEmpty()
        .withMessage(`Email is empty`)
        .isEmail()
        .withMessage("Email is not valid")
        .trim(),
    inputValidation,
    Existuser,
    function (req, res) {
        generateP().then(result => {
            console.log("hashed : ", result)
            Adduser(req, res).then(data => {
                console.log('data is ', data);
                sendMail(data.email, result.pass);
            }).catch(err => {
                //
            })

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