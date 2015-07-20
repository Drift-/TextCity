var notifications = {
	//creates the console
	create: function() {
		var con = document.createElement("div");
		con.id = "notifications";
		document.getElementById("sidebar").appendChild(con); //appends notifications area to document
	},
	
	//adds new message to beginning of console
	log: function(message) {
		var logger = document.getElementById("notifications");
		var mess = document.createElement("p"); //create new paragraph element and add the message text to it
		var mess_text = document.createTextNode(message);
		mess.appendChild(mess_text);
		logger.insertBefore(mess, logger.firstChild); //insert message as first child
		
		if (logger.lastChild != logger.firstChild) { //if it is the first message, do not fade it in; if it is not first message, fade the message in.
			logger.firstChild.style.opacity = 0.0;
			fadeIn(logger.firstChild, 2);
		}
		
		notifications.clear();
	},
	
	//clears messages which are below the windows height
	clear: function() {
		var container = document.getElementById("notifications");
		var elem = container.children;
		for (var i = 0; i < elem.length; i++) {
			if (elem[i].getBoundingClientRect().top + elem[i].clientHeight > container.getBoundingClientRect().top + 300) { //check if element's bottom is below minimum range
				var window_height = window.innerHeight;
				if (elem[i].getBoundingClientRect().top + elem[i].clientHeight >= window_height) elem[i].remove(); //if element's bottom is off the page, remove it
			}
		}
	}
};