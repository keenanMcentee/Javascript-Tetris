class MainMenu extends Scene
{
	constructor(sceneManager)
	{
		super("MainMenu");
		this.soundManager = new SoundManager();
		this.sceneManager = sceneManager;
		this.createButton("Help", "Help", this, "three", this.soundManager);
		this.createButton("Play", "Play", this, "two", this.soundManager);
		this.createButton("MainMenu", "MainMenu", this, "one", this.soundManager);
	}
	
	createButton(name, scene, program, divNum, sm)
	{
		var div = document.createElement("div");
		div.id = name;
		div.sceneName = scene;
		div.innerHTML = '<img src="button_'+divNum+'.png">'; 
		div.addEventListener("touchstart", this.onTouchStart.bind(null, program), {passive:false});
		div.addEventListener("click",this.onTouchStart.bind(null,program),{passive:false});
		div.sm = sm;
		div.sm.loadSoundFile("bg" , "bg.mp3");
		div.sm.init();
		div.classList.add('btn_' + divNum);
		document.body.appendChild(div);
	}
	
	onTouchStart(program, e)
	{
		var currentElement = e.target;
		var parentDiv = currentElement.parentNode;
		program.sceneManager.goToScene(parentDiv.sceneName);
		if (parentDiv.sceneName == "Play")
		{
			program.sceneManager.scenesDict["Play"].grid.score = 0;
		}
		if (parentDiv.sm.playing == false)
		{
			parentDiv.sm.playSound("bg",true, 0.2);
		}
	}
}