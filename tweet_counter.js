var ntwitter = require("ntwitter"),
    redis = require("redis"),
    credentials = require("../credentials.json"),
    twitter,
    trackedWords = ["awesome","cool","rad","gnarly","groovy"],
    counts = {};

twitter = ntwitter(credentials);

// trackedWords.forEach(function (word) { counts[word]=0; });

redisClient = redis.createClient();

trackedWords.forEach(function (word) {
    redisClient.get(word, function (err, wordCount) {
        if (err!=null) {
            console.log("ERROR: "+err);
            return;
        }
        counts[word]=parseInt(wordCount, 10) || 0; // false/NaN/undefined -> 0
    });
});

twitter.stream(
    "statuses/filter",

    { "track": trackedWords },

    function(stream) {
        stream.on("data", function(tweet) {
            trackedWords.forEach(function (word) {
                if (tweet.text.indexOf(word)>-1) {
                    redisClient.incr(word);
                    counts[word]=counts[word]+1;
                }
            });
        });
    }
);

module.exports=counts;
