class Blocks
{
	constructor()
	{
		this.I = [ [0,1,0,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0], ];
			
		this.O = [[1,1],
			 [1,1] ,];
			
		this.J =[
			[0,1],
			[0,1],
			[1,1], ];
		
		this.L =[[1,0],
			[1,0],
			[1,1], ];
			
		this.S =[[1,1,0],
			[0,1,1],];
			
		this.Z =[[1,1,0],
			[0,1,1],];
		this.T = [	[0,0,0],
					[1,1,1],
					[0,1,0] ];
					
					
		
		this.offset = {x:0, y: 0};
		
	}		
	
	createPiece(type)
	{
		this.matrix = null;
		if (type == "I")
		{
			this.matrix = this.I;
		}
		else if (type == "O")
		{
			this.matrix = this.O;
		}
		else if (type == "J")
		{
			this.matrix = this.J;
		}
		else if (type == "L")
		{
			this.matrix = this.L;
		}
		else if (type == "S")
		{
			this.matrix = this.S;
		}
		else if (type == "Z")
		{
			this.matrix = this.Z;
		}
		else if (type == "T")
		{
			this.matrix = this.T;
		}
		
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