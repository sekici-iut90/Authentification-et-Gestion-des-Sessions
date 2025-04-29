const bCrypt = require("bcrypt");
module.exports= function(passport, user){
    const User = user;
    const LocalStrategy = require("passport-local").Strategy;
    passport.serializeUser(function(user,done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findByPk(id).then((user) => {
            if(user){done(null,user.get())}
            else{done(user.errors,null)}
        })
    })
    passport.use("local-signup", new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    },function(req,email,password,done){
        let generateHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8),null)
        }
        User.findOne({where:{emailId:email}}).then((user) => {
            if(user){
                return done(null,false,{message:"Email déjà pris"});
            } else {
                let userPassword = generateHash(password);
                let data = {
                    emailId: email, password: userPassword,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };
                User.create(data).then((newUser,created) => {
                    if(!newUser) {return done(null,false);}
                    if(newUser) {return done(null,newUser);}
                })
            }
        })
    }));
    passport.use("local-signin",  new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    }, function(req,email,password,done){
        let isValidePassword = function(userpass, password){
            return bCrypt.compareSync(password, userpass)
        };
        User.findOne({where:{emailId:email}}).then((user) => {
            if(!user){return done(null, false,{message: "Email n'existe pas"})}
            if(!isValidePassword(user.password, password)) {
                return done(null, false,{message: "Mot de passe incorrect"})
            }
            return done(null, user.get());
        }).catch(err => {return done(null, false,{message:"Une erreur s'est produite."})})
    }));
}