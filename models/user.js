const mongoose=require("mongoose");
let {Schema}=mongoose;

const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);