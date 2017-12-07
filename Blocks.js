class Blocks
{
	constructor()
	{
		this.J = [ 	[0,0,1,0],
					[0,0,1,0],
					[0,0,1,0],
					[0,0,1,0] ];
					
		this.offset = {x:1, y: 1};
	}		
	
	
	
	
	
	draw(ctx, blockSize)
	{
		this.drawMatrix(ctx, this.J, this.offset, blockSize);
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