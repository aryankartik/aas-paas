const mongoose = require('mongoose');
const {Schema}=mongoose;


const paperSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    location:{
        type:String,
    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    city:{
        type:String,
    }
});

const Paper=mongoose.model("Paper",paperSchema);
module.exports=Paper;