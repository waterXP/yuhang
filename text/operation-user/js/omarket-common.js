$(function() {

    // header
    $.ajax({
        type: "get",
        url: "omarket-header.html",
        dataType: "html",
        async: false,
        success: function(data) {
            $(".headerWrap").html(data);
        }
    });

    // aside
    $.ajax({
        type: "get",
        url: "omarket-aside.html",
        dataType: "html",
        async: false,
        success: function(data) {
            $(".asideWrap").html(data);
        }
    });

});
