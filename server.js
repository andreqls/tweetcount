var express=require("express"),
    http=require("http"),
    cookie=require("cookie"),
    tweetCounts=require("./tweet_counter.js"),
    app=express();

app.use(express.static(__dirname+"/client"));

http.createServer(app).listen(3000);

app.get("/counts.json", function(req,res) {
    res.cookie("same-site-cookie","foo", {sameSite:"lax"});
    res.cookie("cross-site-cookie","bar", {sameSite:"none", secure:"true"});
    res.json(tweetCounts);
});

