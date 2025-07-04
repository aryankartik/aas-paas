const mongoose = require('mongoose');
const User=require("./user.js")
const {Schema}=mongoose;


const localPaperSchema=new mongoose.Schema({
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
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

});

const localPaper=mongoose.model("localPaper",localPaperSchema)
module.exports=localPaper;
