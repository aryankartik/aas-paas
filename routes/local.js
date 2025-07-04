const express=require("express");
const router=express.Router({mergeParams:true});
let {isLoggedin,isOwner}=require("../middleware.js")

  // REQUIRE MODELS
  const Paper=require("../models/paper.js");
  const localPaper=require("../models/localPaper.js")
  let {schemaforlocalPaper}=require("../Schema.js")

  //ERROR HANDLER
  const wrapAsync=require("../utils/wrapAsync.js");
  const ExpressError=require("../utils/ExpressError.js");
  const validatelocalPaper=(req,res,next)=>{
    let {error}=schemaforlocalPaper.validate(req.body);
    if(error){
      const msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, msg);
    }else{
      next();
    }
  }

  //LOCAL
  const cities = [
    "Agra", "Ahmedabad", "Aligarh", "Allahabad", "Amritsar", "Bangalore", "Bhilai", "Bhopal", "Bhubaneswar", "Bikaner",
    "Chandigarh", "Chennai", "Coimbatore", "Cuttack", "Delhi", "Dhanbad", "Faridabad", "Ghaziabad", "Gurgaon", "Guwahati",
    "Gwalior", "Hyderabad", "Indore", "Jaipur", "Jalandhar", "Jamshedpur", "Jodhpur", "Kanpur", "Kochi", "Kolkata",
    "Kota", "Lucknow", "Ludhiana", "Madurai", "Meerut", "Mumbai", "Nagpur", "Nashik", "Patna", "Pune",
    "Raipur", "Rajkot", "Ranchi", "Salem", "Surat", "Tiruchirappalli", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam"
  ];



  router.get("",(req,res)=>{
    res.render("local.ejs",{ cities })
  })


  router.get("/:city",wrapAsync(async(req,res)=>{
    let {city}=req.params;
    let cityChoose=await localPaper.find({"city":city}).populate("owner")
    console.log(cityChoose)
    res.render("showLocal.ejs",{cityChoose})
  }))


  
  //Update route
  router.get("/:city/:id/edit",isLoggedin,isOwner, wrapAsync(async(req,res)=>{
    let {city,id}=req.params;
    let findCity=await localPaper.findById(id);
    res.render("edit.ejs",{findCity})
  }))

  router.put("/:city/:id/edit",isOwner,validatelocalPaper, wrapAsync(async(req,res)=>{
    if(!req.body){
      throw new ExpressError(400,"Bad Request")
    }
    let {city,id}=req.params;

    let update=await localPaper.findByIdAndUpdate(id,{...req.body})
  
    req.flash("success","Your event has been updated successfully.")
    res.redirect(`/local/${city}`)
  })) 




  //Delete Route

  router.delete("/:city/:id/delete",isLoggedin,isOwner,wrapAsync(async (req,res)=>{
    let {city,id}=req.params;
    let deleteEvent= await localPaper.findByIdAndDelete(id);
    console.log("deleted")
    req.flash("success","Your event has been deleted.")
    res.redirect(`/local/${city}`)
  }))

module.exports=router;