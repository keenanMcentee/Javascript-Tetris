class Scene
{
	constructor(title)
	{
		console.log("scene created");
		this.title = title;
	}
	
	getTitle()
	{
		return this.title;
	}
	
	render(ctx)
	{
		ctx.strokeText(this.title, 10, 50);
	}
}