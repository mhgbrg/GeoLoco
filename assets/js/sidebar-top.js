function loadSidebarTop(obj) {
	$('#header').empty();

	$('#header').append('<h3 id="spotlightHeader">Spotlight</h3>');

	if (obj.type === 'twitter') {
		$('#header').append(
			"<div class='card' id='currentCard'>" +
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
			"<div class='card' id='currentCard'>" +
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
		$('#header').append(
			"<div class='card' id='currentCard'>" +
			"<div class='card-content black-text'>" +
			"<span class='card-title black-text'>" + obj.headline + "</span>" +
			"<p class='text'>" + obj.snippet + "</p>" +
			"<span class='card-detail'>" + new Date(obj.time).toLocaleString() + "</span>" +
			"<span class='card-detail'>(" + obj.lat + ", " + obj.lng + ")</span><br>" +
			"<span class='card-detail'>" + obj.url + "</span>" +
			"</div>" +
			"</div>"
		);
	} else if (obj.type === 'yikyak') {
		$('#header').append(
			"<div class='card' id='currentCard'>" +
			"<div class='card-content black-text'>" +
			"<p class='text'>" + obj.text + "</p>" +
			"<span class='card-detail'>" + new Date(obj.time).toLocaleString() + "</span>" +
			"<span class='card-detail'>(" + obj.lat + ", " + obj.lng + ")</span>" +
			"</div>" +
			"</div>"
		);

	}

	resizeHeader();
}

function resizeHeader() {
	var h = $("#spotlightHeader").height() + $('div#currentCard').outerHeight() + 20;
	$('#header').height(h);
	// $('.sidebarWrapper').css({"padding-top": $('div#currentCard').height() + 100});
	$('.sidebarWrapper').animate({ scrollTop: 0 }, "fast");
}