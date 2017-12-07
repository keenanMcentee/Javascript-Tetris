class Play extends Scene
{
	constructor(title)
	{
		super(title);
		this.play = this;
		this.grid = new Grid();
		//Blocks ID
		this.blocks = {I: 0, J: 1, L: 2, O: 3, T: 4, S: 5, Z: 6};
		this.jBlock = new Blocks();
		this.timeSinceLastFrame = 0;
		this.move = {x: null, y: null};
		document.addEventListener("touchstart", this.onTouchStart.bind(null, this));
		document.addEventListener('touchmove', this.onTouchMove.bind(null, this));
	}
	update(dt)
	{
		this.timeSinceLastFrame += dt/1000;
		if (this.timeSinceLastFrame > 1.5)
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

	
	onTouchStart(program, e)
	{
		program.move.x = e.touches[0].clientX;
		program.move.y = e.touches[0].clientY;
	}
	
	onTouchMove(program, e)
	{
		if ( !program.move.x  || !program.move.y ) {
			return;
		}

		var xUp = e.touches[0].clientX;                                    
		var yUp = e.touches[0].clientY;

		var xDiff = program.move.x - xUp;
		var yDiff = program.move.y - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 3 ) {
				console.log("Left swipe");
				if (program.jBlock.offset.x > 0)
				{
					program.jBlock.offset.x--;
				}
			} else if (xDiff < 3){
				if (program.jBlock.offset.x < program.grid.rows)
				{
					program.jBlock.offset.x++;
				}
				console.log("Right swipe");
			}
			
		}
		else if (Math.abs(xDiff) < (Math.abs(yDiff)  ))
		{
			if (yDiff < 5){
				console.log("Swipe down");
			} 
			else
			{
				console.log("Touch");
			}
		}
		
		/* reset values */
		program.move.x = null;
		program.move.y = null;               
	}
}