  //EXPRESS
  const express=require("express");
  const app=express();
  const port=3000;
const NewsAPI = require('newsapi');
require('dotenv').config();

  

  //METHOD OVERRIDE
  const methodOverride=require("method-override");
  app.use(methodOverride("_method"))

  //MONGOOSE
 const mongoose = require('mongoose');

main()
  .then(() => {
    console.log("MongoDB Atlas connection successful");
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
  // REQUIRE MODELS
  const Paper=require("./models/paper.js");
  const localPaper=require("./models/localPaper.js")

  //JOI 
  const Joi = require('joi');
  let {schemaforlocalPaper}=require("./Schema.js")


  //SETIING VIEWS ENGINE
  const path=require("path")
  app.set("view engine","ejs")
  app.set("views",path.join(__dirname,"views"))
  app.use(express.urlencoded({extended:true}))
  app.use(express.json());


  //SERVING STATIC FILES
  app.use(express.static(path.join(__dirname,"public")))

  //EJS MATE
  const ejsMate=require("ejs-mate")
  app.engine("ejs",ejsMate)


  //TEST ROUTE JUST TO INSERT !ST EVENT TO CHK EVERYTHING IS OK OR NOT
  app.get("/testPaper",async (req,res)=>{
    let newPaper=new Paper({
      title: "arjit singh concert",
      description: "experience an unforgettable evening with arijit singh as he performs his greatest hits live in mumbai. known for his soulful voice and emotional depth, arijit has delivered some of the most iconic bollywood songs, including tum hi ho, channa mereya, raabta, agar tum saath ho, and kesariya. his live concerts are a mesmerizing blend of romance, heartbreak, and melody, making every performance a magical experience. don't miss the chance to witness india's most beloved playback singer live on stage",
      image: "https://wallpapers.com/images/featured/arijit-singh-q307hnimzo1z26ct.jpg",
      location: "jio world garden, gate number 10, g block bkc, bandra kurla complex, bandra east, mumbai, maharashtra 400051, india",
      date: "25.03.2025",
      time: "06:00 pm ist",
      city:"mumbai"

    })

    await newPaper.save();
    res.send("success")
  });
  //ERROR HANDLER
  const wrapAsync=require("./utils/wrapAsync.js");
  const ExpressError=require("./utils/ExpressError.js");

  //EXPRESS SESSIONS
  const session=require("express-session");
  let sessionOptions={
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true,
    }
  }
  app.use(session(sessionOptions))

  //CONNECT FLASH
  const flash=require("connect-flash");
  app.use(flash());



  //PASSPORT
  const passport=require("passport")
  const LocalStratergy=require("passport-local")
  const User=require("./models/user.js")
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStratergy(User.authenticate()))
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())

  app.get("/demouser",async(req,res)=>{
    let fakeuser=new User({
      email:"student@gmail.com",
      username:"delta"
    })
    let registeredUser=await User.register(fakeuser,"Hello")
    res.send(registeredUser)
    
  })

  let {isLoggedin,saveRedirectUrl}=require("./middleware.js")


  app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.curUser=req.user;
    next();
  })
  //_______________________________________________________________________________________________________________________

  //BACKEND VAIDATION
  const validatelocalPaper=(req,res,next)=>{
    let {error}=schemaforlocalPaper.validate(req.body);
    if(error){
      const msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, msg);
    }else{
      next();
    }
  }




  // __________________________________________________________________________________________________________________________________

  // API 

  
  //ROUTES
  const local=require("./routes/local.js")
  app.use("/local",local)

  app.listen(port,(req,res)=>{
      console.log("app is listening at port 3000")
  })


  app.get("/",(req,res)=>{
    res.render("main.ejs")
    
  })

  //E-PAPER
  app.get("/epaper",wrapAsync(async(req,res)=>{
    let allPaper=await Paper.find({});
    res.render("epaper.ejs",{allPaper})
  }))

// WEATHER
const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.render("weather.ejs", { weatherData: null, error: null });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.render("weather.ejs", {
      weatherData: response.data,
      error: null,
    });
  } catch (error) {
    res.render("weather.ejs", {
      weatherData: null,
      error: "City not found. Please try again.",
    });
  }
});



  //Create route
  app.get("/new",isLoggedin,(req,res)=>{
    
    res.render("new.ejs")
  })

  app.post("/new",validatelocalPaper,wrapAsync(async(req,res)=>{
    if(!req.body){
      throw new ExpressError(400,"Bad Request")
    }
    req.body.city= await req.body.city.charAt(0).toUpperCase()+req.body.city.slice(1).toLowerCase();

    let event=await new localPaper(req.body)
    event.owner=req.user._id
    
    await event.save();
    req.flash("success","Your event is posted successfully..")
    res.redirect("/")
  }))




  // ALL EXTRA PAGES

  app.get("/privacypolicy",(req,res)=>{
    res.render("privacy.ejs")
  })

  app.get("/tnc",(req,res)=>{
    res.render("tnc.ejs")
  })

  app.get("/about",(req,res)=>{
    res.render("about.ejs")
  })

  app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
  })

  // SPORTS
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

app.get('/sports', async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({
      category: 'sports',
      language: 'en',
      pageSize: 10
    });

    const sportsNews = response.articles;

   
    res.render("sports.ejs", { sportsNews });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).send('Failed to fetch sports news.');
  }
});

// TECH PAGE
app.get('/tech', async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({
      category: 'technology',
      language: 'en',
      pageSize: 10
    });

    const techNews = response.articles;
    res.render("tech.ejs", { techNews });
  } catch (error) {
    console.error('Error fetching tech news:', error.message);
    res.status(500).send('Failed to fetch tech news.');
  }
});


  //SIGNUP



  app.get("/signup",async(req,res)=>{
    res.render("signup.ejs")
})

app.post("/signup",async(req,res)=>{
  try{
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    // console. log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success", "Welcome to Aas-Pass!");
        res.redirect("/");
        }
    })
    
}catch(e){
    req.flash("error", `${e.message}`)
    res.redirect("/signup")
    }
})

app.get("/login",(req,res)=>{
  res.render("login.ejs")
})
app.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res)=>{
  req.flash("success","Welcome to Aas-Pass!");
  
  res.redirect(res.locals.redirectUrl || "/")
  
})

app.get("/logout",async(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      next(err)
    }else{
      req.flash("success","You have been successfully logged out")
      res.redirect("/")
    }
  })
})





  // MIDDLEWARE FOR ERROR
  app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"))
  })


  app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{message})
  })

