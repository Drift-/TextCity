var map = {
	//creates the map screen
	create: function() {
		var map_div = document.createElement("div"); //creates the map wrapper
		map_div.id = "map";
		document.getElementById("game").appendChild(map_div);
		
		var title = document.createElement("h3"); //creates the title and adds it to the map wrapper
		var title_text = document.createTextNode("Title");
		title.appendChild(title_text);
		title.id = "mapTitle";
		document.getElementById("map").appendChild(title);
		
		map.overhead.init();
		map.skyline.init();
		map.createWindow();
	},
	
	//creates the minimized map window in the corner of the screen
	createWindow: function() {
		
	},
	
	//the overhead map
	overhead: {
		init: function() {
			
		}
	},
	
	//the skyline map, which shows the city from a side-view perspective
	skyline: {
		TEXT: "",
		MAP: new Array(),
		TREES: new Array(), //This holds the locations of trees, which are drawn in front of buildings
		WIDTH: 80,
		HEIGHT: 45,
		AXIS: [0, 40], //SKY, GROUND
		SYMBOL: [" ", "T"], //SKY, GROUND, WATER
		BLDGYSIZE: [1, 2, 4, 8, 13, 20],
		BLDGXSIZE: [1, 4, 4, 6, 6, 8],
		BLDGLEVELS: [1, 2, 2, 2, 3],
		BLDGSYMBOLS: ['!', "#", "A", "8", "=", "A", "H", "I", "M", "N", "O", "U", "V", "W", "X", "Y", "Z", "|"],
		
		init: function() {
			var skyline_div = document.createElement("div"); //creates the skyline wrapper
			skyline_div.id = "skyline";
			document.getElementById("map").appendChild(skyline_div);
			
			document.getElementById("mapTitle").innerHTML = "Skyline Map";
			
			for (var i = 0; i < map.skyline.HEIGHT; i++) { //initialize the MAP array
				map.skyline.MAP[i] = new Array();
				for (var j = 0; j < map.skyline.WIDTH; j++) {
					map.skyline.MAP[i][j] = new Array();
					map.skyline.MAP[i][j][0] = "";
					map.skyline.MAP[i][j][1] = 41;
				}
			}
			
			map.skyline.generate();
			map.skyline.draw();
		},
		
		//generates the skyline map
		generate: function() {
			var symbol = "";
			for (var i = 0; i < map.skyline.HEIGHT; i++) {
				for (var x = 0; x < map.skyline.AXIS.length; x++) { //applies the right symbol to the correct y-level
					if (i >= map.skyline.AXIS[x]) symbol = map.skyline.SYMBOL[x];
				}
				for (var j = 0; j < map.skyline.WIDTH; j++) { //apply symbols to MAP array
					map.skyline.MAP[i][j][0] = symbol;
				}
			}
			
			//add artefacts around map (sun, clouds, trees)
			for (var i = 0; i < map.skyline.WIDTH; i++) { //trees
				map.skyline.TREES[i] = "&";
			}
			
			map.skyline.generateSkyline();
		},
		
		genBuilding: function(size, x) {
			var max = map.skyline.BLDGYSIZE[size + 1], min = map.skyline.BLDGYSIZE[size]; //max and min heights of buildings
			var levels = Math.floor((Math.random() * map.skyline.BLDGLEVELS[size]) + 1); //define levels of the building
			var height = Math.floor((Math.random() * (max - min + 1)) + min); //generate height of building
			var layer = Math.floor((Math.random() * (40 - 0 + 1)) + 0);
			var symbol = map.skyline.BLDGSYMBOLS[Math.floor((Math.random() * map.skyline.BLDGSYMBOLS.length) + 0)];
			
			var old_x, old_y, old_width;
			for (var i = 1; i < levels + 1; i++) { //loops through the levels
				var lvl_height = Math.ceil(height/levels); //generates where levels will be divided
				if (i === 1) { //continue if this is first level
					var divider = map.skyline.BLDGLEVELS[size] - levels;
					if (divider <= 0) divider = 1;
					var lvl_width = Math.ceil(Math.floor((Math.random() * (map.skyline.BLDGXSIZE[size + 1] - (2 * levels - 1) + 1)) + (2 * levels - 1)) / divider); //get level width
					if (lvl_width < 2) lvl_width = 2;
					
					if ((lvl_width - 1) + x >= map.skyline.WIDTH) x -= ((lvl_width) + x) - map.skyline.WIDTH; //makes sure building stays on screen
					
					map.skyline.addBuilding(x, map.skyline.AXIS[1] - 1, lvl_width, lvl_height, layer, symbol); //add the building to the map
					
					old_x = x; //save values for use in later levels
					old_y = map.skyline.AXIS[1] - 1 - lvl_height;
					old_width = lvl_width;
				} else { //for all other levels
					var max_width = old_width - 1, min_width = 2; //get max and min width of next level
					if (i === 2 && levels === 3) min_width = 3;
					var lvl_width = Math.floor((Math.random() * (max_width - min_width + 1)) + min_width); //get width of building
					
					old_x += Math.floor(Math.random() * (old_width - lvl_width + 1)); //generate new x-starting-value for the next layer
					
					map.skyline.addBuilding(old_x, old_y, lvl_width, lvl_height, layer, symbol); //add the building to the map
					
					old_y -= lvl_height; //save values for use in later levels
					old_width = lvl_width;
				}
			}
		},
		
		addBuilding: function(x, y, width, height, layer, symbol) {
			var xend = x + width, yend = y - height;
			for (var i = y; i > yend; i--) {
				for (var j = x; j < xend; j++) {
					if (map.skyline.MAP[i][j][0] != map.skyline.SYMBOL[1]) { //do not draw building if current building exists, and has a higher layer
						if (map.skyline.MAP[i][j][1] > layer) {
							if (map.skyline.MAP[i][j][0] === " ") {
								map.skyline.MAP[i][j][0] = symbol;
								map.skyline.MAP[i][j][1] = layer;
							}
						} else {
							map.skyline.MAP[i][j][0] = symbol;
							map.skyline.MAP[i][j][1] = layer;
						}
					}
				}
			}
			map.skyline.draw();
		},
		
		draw: function() {
			map.skyline.TEXT = "<p style='text-align: justify;'>";
			for (var i = 0; i < map.skyline.HEIGHT; i++) {
				for (var j = 0; j < map.skyline.WIDTH; j++) {
					if (i === 39 && map.skyline.TREES[j] != " ") map.skyline.TEXT += "&"; //drawing trees
					else {
						if (light === 0) { //light
							if (map.skyline.MAP[i][j][1] != 41) {
								map.skyline.TEXT += "<span style='color: hsl(0, 0%, " + (40 - map.skyline.MAP[i][j][1] + 20) + "%)'>"; //layers
							}
							map.skyline.TEXT += map.skyline.MAP[i][j][0];
							if (map.skyline.MAP[i][j][1] != 41) map.skyline.TEXT += "</span>"; //layers
						} else { //dark
							if (map.skyline.MAP[i][j][1] != 41) {
								if (Math.random() > 0.7) map.skyline.TEXT += "<span style='color: hsl(50, 100%, " + (map.skyline.MAP[i][j][1] + 40) + "%)'>"; //layers
								else map.skyline.TEXT += "<span style='color: hsl(0, 0%, " + (map.skyline.MAP[i][j][1] + 40) + "%)'>";
							}
							map.skyline.TEXT += map.skyline.MAP[i][j][0];
							if (map.skyline.MAP[i][j][1] != 41) map.skyline.TEXT += "</span>"; //layers
						}
					}
				}
				map.skyline.TEXT += "</br>";
			}
			map.skyline.TEXT += "</p>";
			document.getElementById("skyline").innerHTML = map.skyline.TEXT;
		},
		
		generateSkyline: function() {
			for (var i = 0; i < 40; i++) {
				var height = Math.floor(5 - Math.abs(5 - i/4));
				if (height > 4) height = 4;
				
				map.skyline.genBuilding(height, 2 * i);
			}
		}
	},
	
};