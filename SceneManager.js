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
		
		this.iBlockImage = new Image();
		this.iBlockImage.src = "iBlock.jpg";
		
		this.iBlockRotated = new Image();
		this.iBlockRotated.src = "iBlockRotated.jpg";
		
		this.arrowLeft = new Image();
		this.arrowLeft.src = "ArrowLeft.png";
		
		this.arrowRight = new Image();
		this.arrowRight.src = "ArrowRight.png";
		
		this.arrowDown = new Image();
		this.arrowDown.src = "ArrowDown.png";
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
	
	/**
	* Function that updates the play state as it is the only state that requires a clock
	* @param {float} dt delta time 
	*/
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
		ctx.font = ''+25+'px Arial';
		document.body.style.background = 'white';

		if(this.currentScene.title === "MainMenu")
		{
			ctx.drawImage(this.titleImage,0,0);
			ctx.drawImage(this.menuImage,0,500);
		}
		
		if(this.currentScene.title === "Help")
		{
			ctx.strokeText("Swipe up to rotate", 30, 100);
			ctx.drawImage(this.iBlockImage, 30, 120);
			ctx.drawImage(this.iBlockRotated, 250, 120);
			
			ctx.strokeText("Swipe left or right to move block", 30, 500);
			ctx.drawImage(this.iBlockImage, 275, 520);
			ctx.drawImage(this.arrowLeft, 30, 620);
			ctx.drawImage(this.arrowRight, 500, 620);
			
			
			ctx.strokeText("Swipe down to move down a line", 30, 900);
			ctx.drawImage(this.iBlockImage, 275, 920);
			ctx.drawImage(this.arrowDown, 500, 950);
		}
		
		
		this.currentScene.render(ctx, 'pink', 42);
	}
	
}