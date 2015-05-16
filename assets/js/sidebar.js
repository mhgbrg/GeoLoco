/**
 * Created by filip on 16/05/15.
 */

function loadSidebar(data) {

    $('#twitterResults').empty();
    $('#nytimesResults').empty();
    $('#instagramResults').empty();
    $('#yikyakResults').empty();

    $('#sidebarResults').removeClass('invisible');

    var count = 0;
    data.twitter.forEach(function(post) {
        var elem = $('#twitterResults').append(
            '<li id="twitter' + count + '">' +
                "<div class='card'>" +
                    "<div class='card-content black-text'>" +
                        "<span class='card-title black-text'>@" + post.username + "</span>" +
                        "<p class='text'>" + post.text + "</p>" +
                        "<span class='card-detail'>" + new Date(post.time).toLocaleString() + "</span>" +
                        "<span class='card-detail'>" + post.place + "</span>" +
                        "<span class='card-detail'>" + post.lat + ", " + post.lng + "</span>" +
                    "</div>" +
                "</div>" +
            "</li>"
        );

        $('#twitter' + count).click(function() {
            loadSidebarTop(post);
        });

        count = count + 1;
    });

    data.instagram.forEach(function(post) {
        $('#instagramResults').append(
            "<li>" +
                "<div class='card small image-left'>" +
                    "<div class='card-image' style='background-image:url(" + post.images.medium.url + ")'>" +
                        "<img src='" + post.images.medium.url + "'>" +
                    "</div>" +
                    "<div class='card-content'>" +
                        "<span class='card-title black-text'>@" + post.username + "</span>" +
                        "<p class='text'>" + post.caption + "</p>" +
                        "<span class='card-detail'>" + new Date(post.time).toLocaleString() + "</span>" +
                        "<span class='card-detail'>(" + post.lat + ", " + post.lng + ")</span>" +
                    "</div>" +
                "</div>" +
            "</li>"
        );

    });

    data.nytimes.forEach(function(post) {
        $('#nytimesResults').append(
            "<li>" +
                "<div class='card'>" +
                    "<div class='card-content black-text'>" +
                        "<span class='card-title black-text'>" + post.headline + "</span>" +
                            "<p class='text'>" + post.snippet + "</p>" +
                            "<span class='card-detail'>" + new Date(post.time).toLocaleString() + "</span>" +
                            "<span class='card-detail'>(" + post.lat + ", " + post.lng + ")</span><br>" +
                            "<span class='card-detail'>" + post.url + "</span>" +
                    "</div>" +
                "</div>" +
            "</li>"
        );
    });

    data.yikyak.forEach(function(post) {
        $('#yikyakResults').append(
            "<li>" +
            "<div class='card'>" +
            "<div class='card-content black-text'>" +
            "<p class='text'>" + post.text + "</p>" +
            "<span class='card-detail'>" + new Date(post.time).toLocaleString() + "</span>" +
            "<span class='card-detail'>(" + post.lat + ", " + post.lng + ")</span>" +
            "</div>" +
            "</div>" +
            "</li>"
        );

    });

    $('#twitterResultsCount').html(data.twitter.length);
    $('#instagramResultsCount').html(data.instagram.length);
    $('#yikyakResultsCount').html(data.yikyak.length)
    $('#nytimesResultsCount').html(data.nytimes.length);

}