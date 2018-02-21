/** 
 *  @fileOverview Handle the elements of the game.
 *
 *  @author       Keenan McEntee
 */
/**
 * Game class that handles everything currently running.
 * @class
 *
 * @constructor
 *
 */
class Game
{
	constructor()
	{
		
		this.ws = new WebSocket("ws://localhost:8080/wstest");
		this.ws.addEventListener('message', this.handleMessage);
	}
	/**
	* Function to initialize the components of the Game.
	*/
	initWorld()
	{
		this.lastUpdate = 0;
		gameNs.game.initCanvas();
		gameNs.game.initKeyboard();
		var canvas = document.getElementById('mycanvas');
		var ctx = canvas.getContext('2d');
		this.sceneManager = new SceneManager();
		
		var scene = new MainMenu(this.sceneManager, gameNs.game.ws);
		this.sceneManager.addScene(scene);
		
		var scene = new Play(this.sceneManager);
		this.sceneManager.addScene(scene);
		
		var scene = new multiplayerPlay(this.sceneManager);
		this.sceneManager.addScene(scene);	

		var scene = new multiplayerWait(this.sceneManager);
		this.sceneManager.addScene(scene);				
		
		var scene = new Help();
		this.sceneManager.addScene(scene);
		
		var scene = new End();
		this.sceneManager.addScene(scene);
		
		this.sceneManager.goToScene("MainMenu");
		
		
	}
	/**
	 * Initializes the canvas - the drawing surface. The canvas
	 * is added to the document. When a HTML document is loaded into a
	 * browser, it becomes a document object. This document object is
	 * the root node of the HTML document and is considered the 'owner' of all other
	 * nodes such as forms, buttons, the canvas etc.
	 */
	initCanvas()
	{
		// Use the document object to create a new element canvas.
		var canvas = document.createElement("canvas");
		// Assign the canvas an id so we can reference it elsewhere.
		canvas.id = 'mycanvas';
		canvas.width = window.innerWidth + 180;
		canvas.height = window.innerHeight - 200;
		// We want this to be a 2D canvas.
		var ctx = canvas.getContext("2d");
		// Adds the canvas element to the document.
		document.body.appendChild(canvas);
	}
	/**
	 * Helper function that clamps value between min and max and returns value.
	 * Example: clamp(10, 1, 3) will return 3
	 * @param {Integer} value integer value to be clamped.
	 * @param {Integer} min lower range value.
	 * @param {Integer} max upper range value.
	* @return {Integer} min if value is less than min, max if max is less than value, otherwise value.
	 */
	clamp(value, min, max)
	{
		if(max<min) {
			var temp = min;
			min = max;
			max = temp;
		}
		return Math.max(min, Math.min(value, max));
	}
	
	initKeyboard()
	{
		window.addEventListener("keydown", function(e) {
			// Space and arrow keys
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
		}, false);
	}
	/**
	 * Helper function that returns a string of the form 'rgb(r,g,b)' where
	 * r,g and b are numeric values.
	 * @param {Number} r assumed numeric value for red.
	 * @param {Number} g assumed numeric value for green.
	 * @param {Number} b assumed numeric value for blue.
	 * @return {String} a string of the form 'rgb(r,g,b)' where r,g and b are integers clamped between 0 and 255.
	 */
	rgb(r, g, b)
	{
		return 'rgb('+gameNs.game.clamp(Math.round(r),0,255)+', '+gameNs.game.clamp(Math.round(g),0,255)+', '+gameNs.game.clamp(Math.round(b),0,255)+')';
	}
	/**
	 * Function to update all components of the game. 
	 */
	update()
	{
		var now = Date.now();
		var dt = now - gameNs.game.lastUpdate;
		gameNs.game.lastUpdate = now;
		gameNs.game.sceneManager.update(dt, gameNs.game.ws);
		gameNs.game.draw();
		window.requestAnimationFrame(gameNs.game.update); 
	}
	/**
	 * Function to draw every component in the game
	 */
	draw()
	{
		var canvas = document.getElementById('mycanvas');
	    var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width, canvas.height);
		
		this.sceneManager.draw(ctx, canvas)
	}
	handleMessage(evt)
	{
		var message = JSON.parse(evt.data);
		console.log(message);
		
	}
}
