const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/chat", {
    useUnifiedTopology: true,
}).then(() => console.log("Connecté à la BDD"))
  .catch(err => console.error(err));
