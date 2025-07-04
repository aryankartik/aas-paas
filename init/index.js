const mongoose = require('mongoose');
main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1/Aas-Pass");
}

const Paper=require("../models/paper.js");  //Schema aa gya

const initData=require("./data.js");   //got data for schema


async function initDb(){
    await Paper.deleteMany({});
    await Paper.insertMany(initData.data);
    console.log("data sent")
}

initDb();