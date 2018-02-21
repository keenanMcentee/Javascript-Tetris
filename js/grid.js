class Grid
{
	constructor()
	{
		this.position = {x: 20, y: 20}
		this.rows = 10;
		this.columns = 14;
		this.matrix = null;
		this.multiplyer = 1;
		this.score = 0;
		this.point = 0;
		this.pArraySize = 100;
		this.pArray = [];
	}
	createMatrix(w,h)
	{
		const matrix = [];
		{
			while (h--)
			{
				matrix.push(new Array(w).fill(0));
				
			}
			this.matrix = matrix;
		}
	}
	
	merge(player)
	{
		player.matrix.forEach((row, y) => 
		{
			row.forEach((value, x) =>
			{
				if (value !== 0)
				{
					this.matrix[y + player.offset.y][x + player.offset.x] = value;
				}
			})
		})
		
	}
	sweep()
	{
		outer: for (let y = this.matrix.length - 1; y > 0; --y)
		{
			for(let x = 0; x < this.matrix[y].length; ++x)
			{
				if (this.matrix[y][x] === 0)
				{
					continue outer;
				}
				
			}
			const row = this.matrix.splice(y,1)[0].fill(0);
			for(var i = 0; i < this.pArraySize; i++)
				{
					for (let x = 0; x < this.matrix[y].length; x++)
					{
						this.p = new Particle();
						this.p.initialise(x, y , Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5);
						this.pArray.push(this.p);
					}
					
				}
			this.matrix.unshift(row);
			++y;
			this.score += 100 * this.multiplyer;
			this.multiplyer += 1;
			
		}
		this.score += 1;
	}
	collide(player)
	{
		const [m,o] = [player.matrix, player.offset];
		for (var y = 0; y < m.length; ++y)
		{
			for (var x = 0; x < m[y].length; ++x)
			{
				if ((m[y][x] !== 0 && (this.matrix[y + o.y] && this.matrix[y + o.y][x+ o.x] !== 0)))
				{
					return true;
				}
			}
		}
		if ((o.y + m.length) > this.matrix.length)
		{			
			return true;
		}
		return false;
	}
	draw(ctx, blockSize, colors)
	{
		
		for(var i = 0; i < this.columns; i++)
		{
			for (var j = 0; j < this.rows; j++)
			{
				ctx.strokeStyle = "#000000";
				ctx.strokeRect(blockSize.width * j, blockSize.height * i, blockSize.width,blockSize.height);
			}
		}
		
		for(var i = 0; i < this.pArray.length; i++)
		{
			this.pArray[i].update();
			this.pArray[i].draw(ctx,blockSize.width, blockSize.height );
			if (this.pArray[i].isDead())
			{
				this.pArray.splice(i, 1);
			}
		}
		
		this.drawMatrix(ctx, this.matrix, {x:0 , y:0}, blockSize, colors);
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