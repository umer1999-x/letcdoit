
const users = require("../db/connection.js");

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
            subject: "Thanks for verification",
            text: `your email is : ${email} and password is :${password} `,

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
        full_name: req.body.fullname,
    };
    return new Promise((resolve, reject) => {

        users.create(data, (err, success) => {
            console.log(data);
            console.log(err);
            console.log(success);

            if (success) {

                res.send(JSON.stringify({ sucess: true, mes: "new user added sucessfully!" }));
                resolve(succ);
            }
            else {

                res.send(JSON.stringify({ mess: "error occuring during adding user!" }));
                reject(err)
            }
        })
    });

}



module.exports = {
    generateP,
    sendMail,
    Adduser,
};