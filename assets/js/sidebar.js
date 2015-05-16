/**
 * Created by filip on 16/05/15.
 */

function loadSidebar(data) {

    $('ul#sidebarResults').removeClass('invisible');

    var apis = ['twitter', 'instagram', 'nytimes'];

    apis.forEach(function(api) {

        data[api].forEach(function(post) {
            $('#' + api + 'Results').append(
                "<li>" + post.headline + "</li>"
            );
        });

        $('#' + api + 'ResultsCount').html(data[api].length)
    });

}