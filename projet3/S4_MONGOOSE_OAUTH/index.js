

const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
require("./models/User");
require("./models/Blog");
const passport = require('passport');
require("./services/passport")

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true, // cela permet au client d'envoyer des sessions et cookies
    optionsSuccessStatus: 204 // si client respecte toutes ces conditions
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

// TODO SWAGGER DOC

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);


app.get('/', (req, res) => {
    res.send('Salut!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur ecoute sur le port: `, PORT);
});