
const apiGet = require("express").Router();

apiGet.get('/get',(req,res)=>{

    res.send(JSON.stringify({mes:"get post is working"}));
})



module.exports = apiGet;