/**
 * Created by filip on 16/05/15.
 */

function loadSidebar(data) {

    $('#sidebarResults').removeClass('invisible');

    data.twitter.forEach(function(post) {
        $('#twitterResults').append(
            "<li>" +
                "<div class='card'>" +
                    "<div class='card-content black-text'>" +
                        "<span class='card-title'>" + post.username + "</span>" +
                        "<p>" + post.text + "</p>" +
                    "</div>" +
                "</div>" +
            "</li>"
        );
    });

    data.instagram.forEach(function(post) {
        $('#instagramResults').append(
            "<li>" + post.caption + "</li>"
        );

    });

    data.nytimes.forEach(function(post) {
        $('#nytimesResults').append(
            "<li>" + post.headline + "</li>"
        );

    });

    data.yikyak.forEach(function(post) {
        $('#yikyakResults').append(
            "<li>" + post.text + "</li>"
        );

    });

    $('#twitterResultsCount').html(data.twitter.length);
    $('#instagramResultsCount').html(data.instagram.length);
    $('#yikyakResultsCount').html(data.yikyak.length)
    $('#nytimesResultsCount').html(data.nytimes.length);

}