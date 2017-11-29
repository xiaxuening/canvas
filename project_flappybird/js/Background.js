(function(){
	var Background = window.Background = function(){
		this.x = 0;
		this.height = 512;
		this.width = 288;
		this.speed = 1;
	}
	Background.prototype.update = function(){
	 	this.x -= this.speed;
	 	if(this.x < -this.width){
	 		this.x = 0;
	 	}
	}
	Background.prototype.render = function(){
		//渲染3张图片，此时愚蠢的用户以为背景在无缝连续滚动，其实背景在进行和轮播图一样的欺骗。
		//瞧他那傻样！
		game.ctx.drawImage(game.R["bg_day"] , this.x , game.canvas.height - this.height);
		game.ctx.drawImage(game.R["bg_day"] , this.x + this.width, game.canvas.height - this.height)
		game.ctx.drawImage(game.R["bg_day"] , this.x + this.width * 2, game.canvas.height - this.height)

		//渲染矩形，把开裆裤缝上
		game.ctx.fillStyle = "#4ec0ca";
		game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height - this.height);
	}
})();