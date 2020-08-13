var ntwitter = require("ntwitter"),
    credentials = require("../credentials.json"),
    twitter,
    trackedWords = ["awesome","cool","rad","gnarly","groovy"],
    counts = {};

twitter = ntwitter(credentials);
trackedWords.forEach(function (word) { counts[word]=0; });

twitter.stream(
    "statuses/filter",

    { "track": trackedWords },

    function(stream) {
        stream.on("data", function(tweet) {
//          console.log(tweet.text);
            trackedWords.forEach(function (word) {
                console.log(word+": "+tweet.text+"\n");
                if (tweet.text.indexOf(word)>-1) {
                    counts[word]=counts[word]+1;
                    console.log(word+" updated: now="+counts[word]+"\n");
                }
            });
        });
    }
);

/*
setInterval(function () {
    console.log("cool: "+counts.cool);
},3000);*/

module.exports=counts;
