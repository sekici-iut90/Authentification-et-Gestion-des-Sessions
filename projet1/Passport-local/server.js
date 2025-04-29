const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");

//Encodage

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.SECRET);

// Handlebars
const exphbs = require("express-handlebars");
app.set("views","/views");
app.set("view engine", ".hbd");
app.engine('hbs', exphbs.engine({extname:".hbs", defaultLayout:"", layoutDir:""}));

//Models
const models = require("./models");
models.sequelize.sync().then(()=>{
    console.log("Fonctionne bien");
}).catch((err) =>{
    console.log(err);
})


//Passport
app.use(session({secret:process.env.SECRET, resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/passport.js")(passport, models.user);
require("./routes/auth.js")(app,passport);


app.get("/", (req,res) => {
    res.redirect("/home");
})


app.listen(3000, () => {console.log(`Serveur ecoute sur port 3000`)});