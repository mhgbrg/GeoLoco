function loadSidebarTop(obj) {
	$('#header').empty();

	if (obj.type === 'twitter') {
		$('#header').append('<h1>TWITTER</h1>');
		$('#header').append('<p>' + obj.time + '</p>');
		$('#header').append('<p>' + obj.place + '</p>');
		$('#header').append('<p>@' + obj.username + ': ' + obj.text + '</p>');
	} else if (obj.type === 'instagram') {
		$('#header').append('<h1>INSTAGRAM</h1>');
		$('#header').append('<p>' + obj.time + '</p>');
		$('#header').append('<img src="' + obj.images.medium.url + '" />');
		$('#header').append('<p>@' + obj.username + ': ' + obj.caption + '</p>');
	} else if (obj.type === 'nytimes') {
		$('#header').append('<h1>NEW YORK TIMES</h1>');
		$('#header').append('<p>' + obj.time + '</p>');
		$('#header').append('<h3>' + obj.headline + '</h3>');
		$('#header').append('<p>' + obj.snippet + '</p>');
	} else if (obj.type === 'yikyak') {
		$('#header').append('<h1>YIKYAK</h1>');
		$('#header').append('<p>' + obj.time + '</p>');
		$('#header').append('<p>' + obj.text + '</p>');
	}
}