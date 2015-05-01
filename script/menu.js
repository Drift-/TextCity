var light = 1; //0 for light theme, 1 for dark theme

//switches the light value and changes the text of the 'lights' button
function changeTheme() {
	var light_button = document.getElementById("lights");
	if (light === 0) {
		light_button.innerHTML = "lights on";
		light = 1; //lights are now dark
	} else {
		light_button.innerHTML = "lights off";
		light = 0; //lights are now light
	}
	applyStyle();
}

//applies and disables the dark theme stylesheet
function applyStyle() {
	if (document.styleSheets) {
		var style = document.styleSheets[document.styleSheets.length - 1];
		style.disabled = !style.disabled;
	}
}

//creates the UI for the startup menu.
function createStartupMenu() {
	//welcome message and description
	var welcome = document.createElement("h1"); //welcome message
	var welcome_text = document.createTextNode("Welcome to TextCity");
	welcome.appendChild(welcome_text);
	
	var description = document.createElement("h3"); //description of the game
	var description_text = document.createTextNode("A minimalist text-based city builder");
	description.appendChild(description_text);
	
	//buttons
	var button = document.createElement("p"); //link to start playing the game
	var button_text = document.createTextNode("Begin");
	button.appendChild(button_text);
	button.id = "button";
	button.className = "noselect";
	button.onclick = function() {};
	
	//containing div
	var div = document.createElement("div"); //contaning div
	div.id = "menu";
	div.appendChild(welcome);
	div.appendChild(description);
	div.appendChild(button);
	
	document.getElementById("wrapper").appendChild(div); //adds div to the 'wrapper' div element.
}