class Play extends Scene
{
	constructor(title)
	{
		super(title);
		this.grid = new Grid();
		//Blocks ID
		this.blocks = {I: 0, J: 1, L: 2, O: 3, T: 4, S: 5, Z: 6};
		this.jBlock = new Blocks();
		this.timeSinceLastFrame = 0;
	}
	update(dt)
	{
		this.timeSinceLastFrame += dt/60;
		console.log(this.timeSinceLastFrame);
		if (this.timeSinceLastFrame > 20)
		{
			this.timeSinceLastFrame = 0;
			this.jBlock.offset.y += 1;
		}
	}
	render(ctx)
	{
		
		this.blockSize = {width: ((ctx.canvas.width - 200) / this.grid.rows) , height: ((ctx.canvas.height - 200) / this.grid.columns)}
		this.jBlock.draw(ctx, this.blockSize);
		this.grid.draw(ctx, this.blockSize);
	}
}