exports.signup = (req, res) => {
    res.render('signup');
}

exports.signin = (req, res) => {
    res.render('signin');
}

exports.home = (req, res) => {
    res.render('home');
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.redirect("/signin");
        }
    });
}
