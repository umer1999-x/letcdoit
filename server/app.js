const express = require("express");
// const cors = require('cors')
require("dotenv").config()




const app = express();
app.use(express.json());


app.use(express.static('assets'));
app.use(require("./routes/index.js"));

app.listen(8080, () => {
    console.log("server is running at post 8080");
});

