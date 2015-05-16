function loadSidebarTop(obj) {
	$('#header').empty();

	if (obj.type === 'twitter') {
		$('#header').append(
			"<div class='card'>" +
			"<div class='card-content black-text'>" +
			"<span class='card-title black-text'><a href='http://www.twitter.com/" + obj.username + "'>@" + obj.username + "</a></span>" +
			"<p class='text'>" + obj.text + "</p>" +
			"<span class='card-detail'>" + new Date(obj.time).toLocaleString() + "</span>" +
			"<span class='card-detail'>" + obj.place + "</span>" +
			"<span class='card-detail'>" + obj.lat + ", " + obj.lng + "</span>" +
			"</div>" +
			"</div>"
		);
	} else if (obj.type === 'instagram') {
		$('#header').append(
			"<div class='card'>" +
			"<div class='card small image-left'>" +
			"<div class='card-image' style='background-image:url(" + obj.images.medium.url + ")'>" +
			"<img src='" + obj.images.medium.url + "'>" +
			"</div>" +
			"<div class='card-content'>" +
			"<span class='card-title black-text'><a href='http://www.instagram.com/" + obj.username + "'>@" + obj.username + "</a></span>" +
			"<p class='text'>" + obj.caption + "</p>" +
			"<span class='card-detail'>" + new Date(obj.time).toLocaleString() + "</span>" +
			"<span class='card-detail'>" + obj.lat + ", " + obj.lng + "</span>" +
			"</div>"
		);
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