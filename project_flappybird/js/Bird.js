(function(){
	var Bird = window.Bird = function(){
		//几何中心点
		this.x = game.canvas.width * (1 - 0.618);
		this.y = 100;
		this.rotate = 0;
		//每帧变化量
		this.dy = 0;
		//每帧变化量的变化量
		this.ddy = 0.6;
		//有限状态机
		this.fsm = "下落";
		//图片
		this.images = [game.R["bird0_0"] , game.R["bird0_1"] , game.R["bird0_2"]]
		//扑打翅膀
		this.wing = 0;
	}
	Bird.prototype.fly = function(){
		this.fsm = "上升";
		//瞬间上升的距离，游戏的难度就是这个数字：
		this.dy = 11.5;
		//上升的瞬间鸟头上扬
		this.rotate = -1.4;
		//音乐
		document.getElementById("wing").load();
		document.getElementById("wing").play();
	}
	Bird.prototype.update = function(){
		if(this.fsm == "下落"){
			this.dy += this.ddy;
			this.y += this.dy;
		}else if(this.fsm == "上升"){
			this.dy -= this.ddy;
			if(this.dy < 0){
				this.fsm = "下落";
				 
				return;
			}
			this.y -= this.dy;
			//验收
			if(this.y < -12){
				this.y = -12;
			}
		}

		//鸟头旋转
		this.rotate+= 0.06;

		//扑打翅膀
		game.frame % 1 == 0 && this.wing ++;
		if(this.wing > 2){
			this.wing = 0;
		}

		//决定AABB盒
		this.x1 = this.x - 17;
		this.x2 = this.x + 17;
		this.y1 = this.y - 12;
		this.y2 = this.y - 12;


		//落地检测
		if(this.y2 > game.canvas.height - 112){
			//一旦死亡，进入场景3
			game.sm.enter(3);
		}
	}
	Bird.prototype.render = function(){
		game.ctx.save();
		game.ctx.translate(this.x , this.y);
		game.ctx.rotate(this.rotate);
		game.ctx.drawImage(this.images[this.wing],-24,-24);
		game.ctx.restore();


		//渲染小鸟的时候将AABB盒的数值一并打印
		// game.ctx.fillStyle = "red";
		// game.ctx.fillText(this.x1 , this.x - 80 , this.y);
		// game.ctx.fillText(this.x2 , this.x + 50 , this.y);
		// game.ctx.fillText(this.y1 , this.x , this.y - 50);
		// game.ctx.fillText(this.y2 , this.x , this.y + 50);
	}
})();