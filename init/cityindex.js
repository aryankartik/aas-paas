const mongoose = require('mongoose');
main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1/Aas-Pass");
}

let initLocalData=require("./citydata.js")
let localPaper=require("../models/localPaper.js")





async function initDb(){
    await localPaper.deleteMany({});
    initLocalData.localData=initLocalData.localData.map((obj)=>({ ...obj ,owner :"67fe589b3042066ae5620708"})) 
    await localPaper.insertMany(initLocalData.localData);
    console.log("data sent")
}

initDb();