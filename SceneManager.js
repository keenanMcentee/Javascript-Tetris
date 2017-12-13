class SceneManager
{
	/**
	* constructor that creates the sceneManager's variables
	* @constructor 
	*/
	constructor()
	{
		this.currentScene = null;
		this.scenesDict = {};
		this.titles = [];
		this.sceneIndex = -1;
		
		this.menuImage = new Image();
		this.menuImage.src = "MainMenuBackground.jpg";
		this.titleImage = new Image();
		this.titleImage.src = "TetrisTitle.jpg";
		this.menuImage.height = 500;
	}
	/**
	* Function that adds the title of the passed scene to a list of scene titles
	* @param {Scene} scene 
	*/
	addScene(scene)
	{
		this.scenesDict[scene.getTitle()] = scene;
		this.titles.push(scene.getTitle());
		
		if (this.sceneIndex == -1)
		{
			this.sceneIndex++;
			this.currentScene = scene;
		}
	}
	
	/**
	* Function that checks through the list of titles until it finds the passed title name
	* @param {string} title the title of a scene 
	*/
	goToScene(title)
	{
		for (var i = 0; i < this.titles.length;i++)
		{
			if(this.titles[i] === title)
			{
				this.index = i;
			}
		}
		
		this.currentScene = this.scenesDict[this.titles[this.index]];	
	}
	update(dt)
	{
		if (this.currentScene.constructor.name == "Play")
		{
			this.currentScene.update(dt, this);
		}
	}
	/**
	* Render function for the current scene
	* @param {context} ctx canvas.getContext()
	*/
	draw(ctx)
	{
		ctx.font = ''+12+'px Arial';
		document.body.style.background = 'white';

		if(this.currentScene.title === "MainMenu")
		{
			ctx.drawImage(this.titleImage,0,0);
			ctx.drawImage(this.menuImage,0,500);
		}
		
		this.currentScene.render(ctx, 'pink', 42);
	}
	
}