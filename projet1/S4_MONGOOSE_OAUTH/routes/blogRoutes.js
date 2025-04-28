const requireLogin = require('../middlewares/requireLogin');
const mongoose = require("mongoose")
const Blog = mongoose.model("Blog")
const redis = require('redis');

module.exports = app => {
  const client = redis.createClient({
    url:"redis://127.0.0.1:6379"
  });
  client.on("error", err=> console.log(err));
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _id:req.params.id,
      _user:req.user.id
    });
    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    await client.connect();
    const cashedBlogs = await client.get(req.user.id);
    if (cashedBlogs){
      console.log("REDIS");
      return res.send(JSON.parse(cashedBlogs));
    }
    console.log("MONGODB");
    const blogs = await Blog.find({_user:req.user.id});
    await client.set(req.user.id, JSON.stringify(blogs),{
      'EX': 60 * 60
    });
    await client.disconnect();
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    await client.connect();
    const{title, content} = req.body;
    const blog = new Blog({title, content, _user:req.user.id});
    try {
      await blog.save
      await client.del(req.user.id);
      await client.disconnect();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.delete('/api/blogs/:id', requireLogin, async (req, res) => {
    try {
      const blog = await Blog.findOneAndDelete({
        _id:req.params.id, _user:req.user.id
      });
      const blogs = await Blog.find({_user:req.params.id});
      res.send(blogs);
    } catch (err) {
      res.status(500).send({ error: 'Failed to delete blog' });
    }
  });
};
