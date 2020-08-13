var ntwitter = require("ntwitter"),
    credentials = require("../credentials.json"),
    twitter,
    counts = {};

twitter = ntwitter(credentials);

counts.cool=0;

twitter.stream(
    "statuses/filter",

    { "track": ["awesome", "cool", "rad", "gnarly", "groovy"] },

    function(stream) {
        stream.on("data", function(tweet) {
//          console.log(tweet.text);
            if (tweet.text.indexOf("cool")>-1) {
                counts.cool=counts.cool+1;
//              console.log(counts.cool);
            }
        });
    }
);

setInterval(function () {
    console.log("cool: "+counts.cool);
},3000);
