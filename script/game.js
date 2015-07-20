//fade and the delete the current startup menu
function startGame() {
	document.getElementById("start_btn").onclick = ""; //makes it so the start button can no longer be clicked
	fadeOut(document.getElementById("menu"), 5);
	
	setTimeout(function() {createInterface()}, 705);
}

//creates the interface of the game
function createInterface() {
	createSidebar();
}

//creates the sidebar section of the interface
function createSidebar() {
	var sidebar = document.createElement("sidebar"); //create sidebar element, which contains elements on the left sidebar
	sidebar.id = "sidebar";
	var game = document.createElement("div"); //creates game wrapper, which will hold and position all elements in the game
	game.id = "game";
	game.appendChild(sidebar);
	document.getElementById("wrapper").appendChild(game);
	
	var title = document.createElement("h1"); //create title element, which is simply a header that says the name of the game ('TextCity')
	var title_txt = document.createTextNode("TextCity");
	title.id = "title";
	title.appendChild(title_txt);
	document.getElementById("sidebar").appendChild(title);
	
	createTabs();
	notifications.create(); //create notifications area
	notifications.log("test");
	
	document.getElementById("sidebar").style.opacity = 0;
	fadeIn(document.getElementById("sidebar"), 2);
}

//creates the 'tabs' section of the sidebar
function createTabs() {
	var tabs = document.createElement("div");
	tabs.id = "tabs";
	
	var map_tab = document.createElement("h2");
	var map_txt = document.createTextNode("Map");
	map_tab.appendChild(map_txt);
	tabs.appendChild(map_tab);
	map.create();
	
	var budget = document.createElement("h2");
	var budget_txt = document.createTextNode("Budget");
	budget.appendChild(budget_txt);
	tabs.appendChild(budget);
	
	document.getElementById("sidebar").appendChild(tabs);
}