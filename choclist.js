var mainList = $("#chocolate-list");

var ratingClasses = {
    'recommend': 'success',
    'mixed': 'warning',
    'cannot-recommend': 'danger',
    'working': 'danger',
    'responded': 'danger',
    'no-disclosure': 'danger',
    'no-response': 'danger'
};

var ratingLabels = {
    'recommend': '🍫 Recommended',
    'mixed': 'Mixed',
    'cannot-recommend': 'Not Recommended',
    'working': 'Not Recommended',
    'responded': 'Not Recommended',
    'no-disclosure': 'Not Recommended',
    'no-response': 'Not Recommended'
};

$.getJSON("choclist.json", function (data) {
    var items = [];
    var ratingClass;
    $.each(data, function (key, val) {
        ratingClass =
        items.push("<li class='list-group-item d-flex justify-content-between align-items-center " + ratingClasses[val.rating] + "'>"
            + val.vendor + "<span class='badge badge-" + ratingClasses[val.rating] + " badge-pill'>" + ratingLabels[val.rating] + "</span></li>");
    });

    $("<ul/>", {
        "class": "list-group",
        html: items.join("")
    }).appendTo(mainList);
});

var filter = "";

function updateList() {
    var searchVal = $("#search").val();
    var item;
    var show;

    console.log("filter: [", filter, "]searchval:", searchVal);

    $("li").each(function() {
        item = $(this);
        show = false;
        if (filter === "" || item.hasClass(filter)) {
            if (searchVal === "" || item.contents().eq(0).text().toUpperCase().indexOf(searchVal.toUpperCase()) > -1) {
                show = true;
            }
        }

        item.toggle(show).toggleClass('d-flex', show);
    });
}

$("#search").on('input', updateList);

$(".btn").on('click', function () {
    filter = $(this).find('input').val();
    updateList();
});