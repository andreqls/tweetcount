var main = function () {
    "use strict";

    /*
    $.getJSON("/counts.json", function (wordCounts) {
        console.log(wordCounts);
    });
    */

    var insertCountsIntoDOM = function (counts) {
        var $block=$("<ul>");
        for (var word in counts) {
            if (counts.hasOwnProperty(word)) {
                var $item = $("<li>");
                $item.text(word+": "+counts[word]);
                $block.append($item);
            }
        }
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
