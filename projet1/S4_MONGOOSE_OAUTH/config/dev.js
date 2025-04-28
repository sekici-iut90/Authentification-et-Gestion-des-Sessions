require('dotenv').config();

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: "mongodb://localhost:27017/<id>",
  cookieKey: "BUTINFOS5"
};
