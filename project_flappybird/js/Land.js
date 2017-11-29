(function(){
	var Land = window.Land = function(){
		this.x = 0;
		this.height = 112;
		this.width = 336;
	}
	Land.prototype.update = function(){
		this.x-=2;
		if(this.x < -this.width){
			this.x = 0;
		}
	}
	Land.prototype.render = function(){
		//欺骗用户，无缝连续滚动
		game.ctx.drawImage(game.R["land"],this.x,game.canvas.height - this.height);
		game.ctx.drawImage(game.R["land"],this.x + this.width,game.canvas.height - this.height);
		game.ctx.drawImage(game.R["land"],this.x + this.width * 2,game.canvas.height - this.height);
	}
})();