const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
  cors: {
    origin:"*"
  }
});
const helmet = require('helmet');
const morgan = require('morgan');

// Apply Helmet to secure HTTP headers po
app.use(helmet());

// Use Morgan for logging HTTP requests (using 'dev' format for development)
app.use(morgan('dev'));
require('./libs/db-connection');
const Chat = require("./models/Chat")

app.get("/", async(req, res)=> {
  try {
    const messages = await Chat.find({});
    res.render("index", {messages});
  } catch (err) { console.error(err);
    res.status().send("erreur interne")
    
  }
});

io.on('connection', (socket)=>{
  console.log("User connecteed: ", socket.id);
  socket.on("chat", async(data)=>{
    try {
      await Chat.create({name:data.handle, message:data.message});
      io.emit("chat", data);
    } catch (err){console.error(err)}
  });
  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing', data);
  });
  socket.on("disconnect", ()=>{
    console.log("User is disconnected: ", socket.id);
  });
});

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
