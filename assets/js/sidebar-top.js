function loadSidebarTop(obj) {
	$('#header').empty();

	if (obj.type === 'twitter') {
		$('#header').append('<h1>TWITTER</h1>');
		$('#header').append('<p>' + new Date(obj.time).toLocaleString() + '</p>');
		$('#header').append('<p><i class="small mdi-communication-location-on"></i>' + obj.place + '</p>');
		$('#header').append('<p><a href="http://www.twitter.com/' + obj.username + '">@' + obj.username + '</a>: ' + obj.text + '</p>');
	} else if (obj.type === 'instagram') {
		$('#header').append('<h1>INSTAGRAM</h1>');
		$('#header').append('<p>' + new Date(obj.time).toLocaleString() + '</p>');
		$('#header').append('<img src="' + obj.images.medium.url + '" />');
		$('#header').append('<p><a href="http://www.instagram.com/' + obj.username + '">@' + obj.username + '</a>: ' + obj.caption + '</p>');
	} else if (obj.type === 'nytimes') {
		$('#header').append('<h1>NEW YORK TIMES</h1>');
		$('#header').append('<p>' + new Date(obj.time).toLocaleString() + '</p>');
		$('#header').append('<h3><a href="' + obj.url + '">' + obj.headline + '</a></h3>');
		$('#header').append('<p>' + obj.snippet + '</p>');
	} else if (obj.type === 'yikyak') {
		$('#header').append('<h1>YIKYAK</h1>');
		$('#header').append('<p>' + new Date(obj.time).toLocaleString() + '</p>');
		$('#header').append('<p>' + obj.text + '</p>');
	}
}