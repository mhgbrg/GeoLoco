/**
 * Created by filip on 16/05/15.
 */

function loadSidebar(data) {

    data.twitter.forEach(function(post) {
        $('#twitterResults').append(
          "<li>" + post.text + "</li>"
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

    $('#twitterResultsCount').html(data.twitter.length)
    $('#instagramResultsCount').html(data.instagram.length)
    $('#nytimesResultsCount').html(data.nytimes.length)

}