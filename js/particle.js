class Particle 
{
	initialise(locationX, locationY, speedX, speedY)
	{
		this.position = {x : locationX, y: locationY};
		this.velocity = {x: speedX * 0.1, y: speedY * 0.1};
		this.lifespan = 255.0;
	}
	
	update()
	{
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y 
		this.lifespan -= 5;
	}
	
	draw(ctx, blockWidth, blockHeight)
	{
		ctx.beginPath();
		
		var a = this.lifespan / 255;
		ctx.arc(this.position.x * blockWidth, this.position.y * blockHeight, 25, 0, Math.PI * 2, true);
		var r = Math.floor(Math.random() * 255) + 0;
		var g = Math.floor(Math.random() * 255) + 0;
		var b = Math.floor(Math.random() * 255) + 0;
		ctx.fillStyle = this.rgb(r,g,b, a);
		
		ctx.fill();              
		                         
		ctx.closePath();     
		
		ctx.globalAlpha = 255;
		
		
	}                            
	
	isDead()
	{
		if(this.lifespan <= 0.0)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
	
		//clamps the passed value between a min and max value and returns it if it is
	//below the max value
	clamp(value, min, max)
	{
		if(max<min) {
			var temp = min;
			min = max;
			max = temp;
		}
		return Math.max(min, Math.min(value, max));
	}

	//returns a string version of the r g b values passed through it
	rgb(r, g, b, a)
	{
		return 'rgba('+this.clamp(Math.round(r),0,255)+', '+this.clamp(Math.round(g),0,255)+', '+this.clamp(Math.round(b),0,255)+', '+this.clamp(Math.round(b),0,255)+')';
	}

}