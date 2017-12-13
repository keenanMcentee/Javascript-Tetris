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