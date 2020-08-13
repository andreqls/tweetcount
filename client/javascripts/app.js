var main = function () {
    "use strict";

    /*
    $.getJSON("/counts.json", function (wordCounts) {
        console.log(wordCounts);
    });
    */

    var insertCountsIntoDOM = function (counts) {
        var $block=$("<p>");
        $block.val("");
        $block.text("cool: "+counts.cool);
        $(".content").append($block);
    };

    setInterval(function () {
        $.getJSON("counts.json", function (counts) {
            $(".content").empty();
            insertCountsIntoDOM(counts);
        });
    }, 5000);

};

$(document).ready(main);
