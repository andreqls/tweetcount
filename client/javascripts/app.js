var main = function () {
    "use strict";

    $.getJSON("/counts.json", function (wordCounts) {
        console.log(wordCounts);
    });

};

$(document).ready(main);
