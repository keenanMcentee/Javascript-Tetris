class Play extends Scene
{
	constructor(sceneManager)
	{
		super("Play");
		this.sceneManager = sceneManager;
		this.play = this;
		this.grid = new Grid();
		this.gridMatrix = this.grid.createMatrix(this.grid.rows,this.grid.columns);
		this.player = new Blocks();
		this.playerReset();
		this.timeSinceLastFrame = 0;
		this.move = {x: null, y: null};
			console.log("Touch");
			document.addEventListener("touchstart", this.onTouchStart.bind(null, this), {passive:false});
			document.addEventListener('touchmove', this.onTouchMove.bind(null, this), {passive:false});
			console.log("NoTouch");
			document.addEventListener("keydown", this.keyDownHandler.bind(null, this));
		this.colors = [
		null,
		'red',
		'blue',
		'violet',
		'green',
		'purple',
		'orange',
		'pink']
		this.updateScore();
	}
	update(dt)
	{
		
		this.timeSinceLastFrame += dt/1000;
		if (this.timeSinceLastFrame > 2.0 - (this.grid.score / 1000.0))
		{
			this.timeSinceLastFrame = 0;
			this.blockDrop();
		}
	}
	render(ctx)
	{
		
		this.blockSize = {width: ((ctx.canvas.width - 200) / this.grid.rows) , height: ((ctx.canvas.height - 200) / this.grid.columns)}
		this.player.draw(ctx, this.blockSize, this.colors);
		this.grid.draw(ctx, this.blockSize, this.colors);
	}
	blockDrop()
	{
		this.player.offset.y += 1;
		this.checkCollide();
		this.updateScore();
	}
	checkCollide()
	{
		if (this.grid.collide(this.player))
		{
			this.player.offset.y--;
			this.grid.merge(this.player);
			this.playerReset();
			this.grid.sweep();
		}
	}
	playerReset()
	{
		const pieces = "ILJOTSZ";
		this.player.createPiece(pieces[pieces.length * Math.random() | 0]);
		this.player.offset.y = 0;
		this.player.offset.x = (this.grid.matrix[0].length / 2);
		if (this.grid.collide(this.player))
		{
			this.grid.matrix.forEach(row => row.fill(0));
			this.sceneManager.goToScene("End");
		}
		
		
		
	}
	playerMove(dir)
	{
		this.player.offset.x += dir;
		if (this.grid.collide(this.player))
		{
			this.player.offset.x -= dir;
		}
	}
	updateScore()
	{
		document.getElementById('score').innerText = "Score: "+this.grid.score;
	}
	
	rotate(matrix){
		for (let y = 0; y < matrix.length; y++)
		{
			for (let x = 0; x < y; x++)
			{
				[matrix[x][y], matrix[y][x],] = [matrix[y][x], matrix[x][y],] ;
			}
		}
		matrix.forEach(row=> row.reverse());
	}
	
	onTouchStart(program, e) {                                         
		program.move.x = e.touches[0].clientX;                                      
		program.move.y = e.touches[0].clientY;                                      
	}; 
	
	
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
				if (program.player.offset.x > 0)
				{
					program.playerMove(-1);
				}
			} else if (xDiff < 3){
				if (program.player.offset.x < program.grid.rows)
				{
					program.playerMove(+1);
				}
				console.log("Right swipe");
			}
			
		}
		else if (Math.abs(xDiff) < (Math.abs(yDiff)  ))
		{
			if (yDiff < 5){
				console.log("Swipe down");
				program.player.offset.y++;
				program.checkCollide();
			} 
			else
			{
				console.log("Rotate / TAP");
				program.rotate(program.player.matrix);
			}
		}
		
		/* reset values */
		program.move.x = null;
		program.move.y = null;               
	}
		
		/**
	 * Event function that is triggered when a key is pressed.
	 */
	keyDownHandler (program, e)
	{
		//code triggered when UP arrow is pressed
		if(e.keyCode === 37)
		{	//LEFT
			if (program.player.offset.x > 0)
			{
				program.playerMove(-1);
				program.checkCollide();
			}
		}
		if(e.keyCode === 38)
		{	//UP
			program.rotate(program.player.matrix);
			program.checkCollide();
		}
		if(e.keyCode === 39)
		{	//RIGHT
			if (program.player.offset.x < program.grid.rows)
			{
				program.playerMove(+1);
				program.checkCollide();
			}
		}
		if(e.keyCode === 40)
		{	//DOWN
			program.player.offset.y++;
			program.checkCollide();
		}
	}

}