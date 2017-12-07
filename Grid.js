class Grid
{
	constructor()
	{
		this.position = {x: 20, y: 20}
		this.rows = 10;
		this.columns = 15;
	}

	draw(ctx, blockSize)
	{
		
		for(var i = 0; i < this.columns; i++)
		{
			for (var j = 0; j < this.rows; j++)
			{
				ctx.strokeStyle = "#000000";
				ctx.strokeRect(blockSize.width * j, blockSize.height * i, blockSize.width,blockSize.height);
			}
		}
		
	}
}