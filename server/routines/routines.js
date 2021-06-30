
const users = require("../models/users.js");

const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const saltRounds = 10;

function generateP() {
    return new Promise((resolve, reject) => {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';

        for (i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                * str.length + 1);

            pass += str.charAt(char)
        }

        bcrypt.hash(pass, saltRounds, function (err, hash) {
            if (err) { reject() }
            else {
                resolve({ hash, pass })
            }
        });

    })
}


async function sendMail(email,password) {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sheikhumer1999@gmail.com",
                pass: "punjab15",
            },
        });

        const mailOptions = {
            from: "M.Umer Sheikh <sheikhumer1999@gmail.com>",
            to: email,
            subject: "You Are The Member!",
            // text: `your email is : ${email} and password is :${password} `,
            html: createEmailHTML(email, password)
        };

        const result = await transport.sendMail(mailOptions);
        console.log("Email Rsult : ", result);
        return result;
    } catch (error) {
        console.log("Email Error : ", error);
        return error;
    }
}


function Adduser(req, res) {
    let data = {
        email: req.body.email,
        password: req.body.password,
        full_name: req.body.name,
    };
    return new Promise((resolve, reject) => {

        users.create(data, (err, success) => {
            console.log(data);
            console.log(err);
            console.log(success);

            if (success) {

                // res.send(JSON.stringify({ sucess: true, mes: "new user added sucessfully!" }));
                resolve(success);
            }
            else {

                res.send(JSON.stringify({ error: "error occuring during adding user!" }));
            }
        })
    });

}


function createEmailHTML(email, password) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <style>
            * {
                text-align: center;
                font-family: sans-serif;
            }
        </style>
        <body>
            <div>
                <img height="100" src="http://18.118.173.214/images/limlinks/logo.png">
                <h1>Thank You!</h1>
                <h3>This is your credentials</h3>
                <h5><strong>Email: </strong>${email}</h5>
                <h5><strong>Password: </strong>${password}</h5>
            </div>   
        </body>
    </html>
    `
};


module.exports = {
    generateP,
    sendMail,
    Adduser,
};