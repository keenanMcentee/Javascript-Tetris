class Blocks
{
	constructor()
	{
		this.score = 0;
		this.matrix = null;
		this.I = [ [0,1,0,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0], ];
			
		this.O = [[2,2],
			 [2,2] ,];
			
		this.J =[
			[0,3,0],
			[0,3,0],
			[3,3,0], ];
		
		this.L =[[4,0,0],
			[4,0,0],
			[4,4,0], ];
			
		this.S =[[5,5,0],
			[0,5,5],
			[0,0,0]];
			
		this.Z =[[6,6,0],
			[0,6,6],
			[0,0,0]];
		this.T = [	[0,0,0],
					[7,7,7],
					[0,7,0] ];
					
					
		
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
	
	
	
	draw(ctx, blockSize, colors)
	{
		
		this.drawMatrix(ctx, this.matrix, this.offset, blockSize, colors);
	}
	
	
	drawMatrix(ctx, matrix, offset, blockSize, colors){
		matrix.forEach((row,y) => 
		{
			row.forEach((value,x) => 
			{
				if(value !== 0)
				{
					ctx.fillStyle = colors[value];
					ctx.fillRect(x * blockSize.width + (offset.x * blockSize.width),
								y * blockSize.height + (offset.y * blockSize.height),
								blockSize.width,
								blockSize.height);
				}
			});
		});
	}
}