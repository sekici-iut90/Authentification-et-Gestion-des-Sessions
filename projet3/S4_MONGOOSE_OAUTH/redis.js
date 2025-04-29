//redis.js

const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
async function mains(){
    const client = redis.createClient({url:redisUrl});
    client.on("error", err=>console.error(err));
    await client.connect();
    console.log("connecté avec succès");
    await client.set("R403", "NOSQL");
    await client.set("R407");
    let r403 = await client.get("R403");
    console.log("R403: ", r403);

    await client.HSET("123", "blogs", "Blog A");
    await client.HSET("123", "articles", "[{article:1}, {article:2}]");
    let blogs = await client.HGET("123", "blogs");
    console.log(blogs);
    let valeurs = await client.HGETALL("123");
    for (let cle in valeurs){console.log('Clé:${cle}, valeur:${valeurs[cle]}')}
    let obj = {"blog": 1, "prix": "test"};
    await client.set("blog", JSON.stringify(obj), {
        'EX':10
    });
    let blogval = await client.get("blog");
    blogval = JSON.parse(blogval);
    console.log(blogval);
    await client.flushAll();

    await client.disconnect();
}
mains().then(r=>console.log("OK"));