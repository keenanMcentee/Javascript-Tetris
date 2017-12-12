class MainMenu extends Scene
{
	constructor(sceneManager)
	{
		super("MainMenu");
		this.sceneManager = sceneManager;
		this.createButton("Help", "Help", this, 3);
		this.createButton("Play", "Play", this, 2);
		this.createButton("MainMenu", "MainMenu", this, 1);
	}
	
	createButton(name, scene, program, divNum)
	{
		var div = document.createElement("div");
		div.id = name;
		div.sceneName = scene;
		div.innerHTML = '<img src="button'+divNum+'.png">'; 
		div.addEventListener("touchstart", this.onTouchStart.bind(null, program));
		div.classList.add('btn' + divNum);
		document.body.appendChild(div);
	}
	
	
	
	
	
	onTouchStart(program, e)
	{
		var currentElement = e.target;
		var parentDiv = currentElement.parentNode;
		program.sceneManager.goToScene(parentDiv.sceneName);
	}
}



// var currentElement = e.target;
	// var parentDiv = currentElement.parentNode;
	// console.log("Div id = " + parentDiv.id);
	// if (!parentDiv.soundManager.playing && !parentDiv.soundManager.loop)
	// {
		// parentDiv.soundManager.playSound(parentDiv.id, false, volume);
	// }
	// else if (parentDiv.soundManager.playing && !parentDiv.soundManager.loop)
	// {
		// parentDiv.soundManager.setLoop(true);
		// parentDiv.classList.add('buttonBorder');
	// }
	// else
	// {
		// parentDiv.soundManager.stop();
		// parentDiv.classList.remove('buttonBorder');
	// }
	// console.log("Image URL = " + currentElement.src);	