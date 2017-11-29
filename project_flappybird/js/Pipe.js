(function(){
	var Pipe = window.Pipe = function(){
		//管子的高度（指的是上面管子的高度）
		this.h = parseInt(Math.random() * 220) + 100;
		//上下管子之间的间隙
		this.space = 140;
		//下管子的高度（因变量，不是主动量）
		this.h2 = game.canvas.height - 112 - this.h - this.space;
		//初始位置
		this.x = game.canvas.width;
		//标记，这个管子是不是已经被加过分了
		this.done = false;

		//把自己加入队列
		game.pipeArr.push(this);
	}
	Pipe.prototype.update = function(){
		this.x -= 2;
		
		//自杀检测
		if(this.x < -52){
			for (var i = 0; i < game.pipeArr.length; i++) {
				if(game.pipeArr[i] === this){
					game.pipeArr.splice(i,1);
				}
			};
		}

		//计算AABB盒
		this.x1 = this.x;
		this.x2 = this.x + 52;
		this.y1 = this.h;
		this.y2 = this.h + this.space;

		//碰撞检测！
		//鸟的x2 > 管子的x1 && 鸟的y1 < 管子.y1 && 鸟的x1 <  管子的x2
		//鸟的x2 > 管子的x1 && 鸟的y2 > 管子.y2 && 鸟的x1 <  管子的x2
		if(
			game.bird.x2 > this.x1 && game.bird.y1 < this.y1 && game.bird.x1 < this.x2
			||
			game.bird.x2 > this.x1 && game.bird.y2 > this.y2 && game.bird.x1 < this.x2
		){
			//一旦死亡，进入场景3
			game.sm.enter(3);
		}

		//加分检测，当这个管子还没有加过分的时候：
		if(!this.done && game.bird.x1 > this.x2){
			game.score++;
			//弄脏管子
			this.done = true;
			//音乐
			document.getElementById("point").load();
			document.getElementById("point").play();
		}
	}
	Pipe.prototype.render = function(){
		game.ctx.drawImage(game.R["pipe_down"],0,320-this.h,52,this.h,this.x,0,52,this.h);
		game.ctx.drawImage(game.R["pipe_up"],0,0,52,this.h2, this.x , this.h + this.space , 52 , this.h2);
	
		//为了方便调试，我们在渲染管子的时候，一并渲染AABB盒
		// game.ctx.fillStyle = "red";
		// game.ctx.fillText(this.x1 , this.x - 20 , this.h + this.space / 2);
		// game.ctx.fillText(this.x2 , this.x + 70 , this.h + this.space / 2);
		// game.ctx.fillText(this.y1 , this.x , this.h);
		// game.ctx.fillText(this.y2 , this.x , this.h + this.space - 30);
	}
})();