const localPaper=require("./models/localPaper.js")

module.exports.isLoggedin=(req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to post an Event..")
        return res.redirect("/login")
      }
      next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}


module.exports.isOwner=async(req,res,next)=>{
    let {city,id}=req.params;
    
    let updateEvent=await localPaper.findById(id)
    if(!updateEvent.owner.equals(res.locals.curUser._id)){
      req.flash("error","You don't have permission to perform this action")
      return res.redirect(`/local/${city}`)
    }
    next();
    
}