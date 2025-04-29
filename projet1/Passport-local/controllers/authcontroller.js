exports.signup = (req,res) => {
    res.ender('signup');
}
exports.signin = (req,res) => {
    res.ender('signin');
}
exports.home = (req,res) => {
    res.ender('home');
}
exports.logout = (req,res) =>{
    req.session.destroy((err) => {
        if(!err){
            res.redirect("/signin");
        }
    })
}

