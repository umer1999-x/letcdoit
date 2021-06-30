
const users = require("../models/users.js");
const {validationResult } = require("express-validator");
function Existuser(req, res, next) {
    users.findOne({ email: req.body.email }, (err, find) => {
        if (find) {
            console.log("user already occured");
            res.send(
                JSON.stringify({ error: "Email already exist please change the mail!" })
            );
        } else {
            next();
        }
    });
}


function Check_USER(req, res, next) {
    users.findOne({ email: req.body.email }, (error, success) => {
        console.log(success, error)
        if (success) {
            req.body.hashedpass = success.password
            next();
            //res.send(JSON.stringify({ mes: "Email already exist please change the mail!" }));
        }
        else {
            console.log('error is', error);
            res.status(400).send()
        }

    });

}

function inputValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.send(JSON.stringify({ error: "Please enter the valid fields" }));
    else next();
}

module.exports = {
   inputValidation,
   Check_USER,
   Existuser,
};


