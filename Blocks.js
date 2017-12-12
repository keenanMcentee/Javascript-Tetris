class Blocks
{
	constructor()
	{
		this.matrix = [
					[1,1,1],
					[0,1,0] ];
					
		this.offset = {x:0, y: 0};
	}		
	
	
	
	
	
	draw(ctx, blockSize)
	{
		this.drawMatrix(ctx, this.matrix, this.offset, blockSize);
	}
	
	
	drawMatrix(ctx, matrix, offset, blockSize){
		matrix.forEach((row,y) => 
		{
			row.forEach((value,x) => 
			{
				if(value !== 0)
				{
					ctx.fillStyle = 'red';
					ctx.fillRect(x * blockSize.width + (offset.x * blockSize.width),
								y * blockSize.height + (offset.y * blockSize.height),
								blockSize.width,
								blockSize.height);
				}
			});
		});
	}
}