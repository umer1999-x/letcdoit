console.log(process.env.DBurl)
const mongoose = require('mongoose');
mongoose.connect(process.env.DBurl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(()=>{
    console.log(`connection sucessful`);
  }).catch((err)=>{
    console.log(`connection not sucessful`);
  });