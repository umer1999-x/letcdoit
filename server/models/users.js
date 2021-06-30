const mongoose = require('mongoose');

const letcdoit = new mongoose.Schema({
    email: {
        type: String,
        requried: true,
    },

    password: {
        type: String,
        requried: true,
    },

    fullname: {
        type: String,
        requried: true
    },

});

users = mongoose.model('letcdoit', letcdoit);
module.exports = users;
