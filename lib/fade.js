function fadeOut(elem, time) {
	var opacity = window.getComputedStyle(elem).opacity; //get the current opacity of the element
	if (opacity > 0) {
		opacity -= 0.01;
		elem.style.opacity = opacity;
		setTimeout(function() {fadeOut(elem, time)}, time);
	} else {
		elem.remove();
	}
}

function fadeIn(elem, time) {
	var opacity = window.getComputedStyle(elem).opacity; //get the current opacity of the element
	if (opacity < 1) {
		opacity = +opacity + 0.01;
		elem.style.opacity = opacity;
		setTimeout(function() {fadeIn(elem, time)}, time);
	}
}