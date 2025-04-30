const authController = require("../controllers/authcontroller");
module.exports = function (app,passport) {
    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/signin");
    }
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/home', isLoggedIn, authController.home);
    app.get("/logout", authController.logout);
    app.post("/signin", passport.authenticate('local-signin',
        {succesRedirect: '/home', failureRedirect:"/signin"}
    ));
    app.post("/signup", passport.authenticate('local-signup',
        {succesRedirect: '/home', failureRedirect:"/signup"}
    ));
}
