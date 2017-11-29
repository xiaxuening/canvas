(function(){
	var SceneManager = window.SceneManager = function(){
		this.bindEvent();
	}
	//进入某一个场景
	SceneManager.prototype.enter = function(number){
		game.scene = number;

		//根据进入的场景来做事情
		switch(game.scene){
			case 0:
				this.titleY = 0;
				this.buttonX = (game.canvas.width - 116) / 2;
				this.buttonY = game.canvas.height;
				this.birdY = 250;
				this.birdDirection = 1;
				break;
			case 1:
				this.tutorialAlpha = 1;
				this.tutorialAlphaDirection = -1;
				break;
			case 2:
				game.background = new Background();
				game.land = new Land();
				game.bird = new Bird();
				game.pipeArr = [];
				//分数清零
				game.score = 0;
				break;
			case 3:
				//爆炸序号
				this.showbomb = false;
				this.baozha = 1;
				//音乐
				document.getElementById("hit").load();
				document.getElementById("hit").play();
				document.getElementById("die").load();
				document.getElementById("die").play();
				break;
			case 4:
				this.gameoverY = -54;
				this.showjiangpai = false;

				// 我们现在要将分数数组去重然后排序
				var arr = JSON.parse(localStorage.getItem("flappybird"));
				arr = _.uniq(arr);
				arr = _.sortBy(arr,function(item){
					return item;
				});
				this.best = arr[arr.length - 1];
				// 决定发什么奖牌
				if(game.score >= arr[arr.length - 1]){
					this.model = "medals_1";
					this.best = game.score;
				}else if(game.score >= arr[arr.length - 2]){
					this.model = "medals_2";
				}else if(game.score >= arr[arr.length - 2]){
					this.model = "medals_3";
				}else{
					this.model = "medals_0";
				}

				//将分数推入数组
				arr.push(game.score);
				localStorage.setItem("flappybird" , JSON.stringify(arr));


				//颁奖
				this.score_panelY = game.canvas.height;
				break;
		}
	}
	SceneManager.prototype.updateAndRender = function(){
		//根据进入的场景来做事情
		switch(game.scene){
			case 0:
				//渲染背景和大地
				game.ctx.fillStyle = "#4ec0ca";
				game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
				game.ctx.drawImage(game.R["bg_day"] , 0 , game.canvas.height - 512);
				game.ctx.drawImage(game.R["bg_day"] , 288 , game.canvas.height - 512);
				game.ctx.drawImage(game.R["land"] , 0 , game.canvas.height - 112);
				game.ctx.drawImage(game.R["land"] , 336 , game.canvas.height - 112);
				//渲染title
				this.titleY += 160 / 20;
				if(this.titleY > 160) this.titleY = 160;
				game.ctx.drawImage(game.R["title"] , (game.canvas.width - 178) / 2 , this.titleY);
				//渲染button
				this.buttonY -= (game.canvas.height - 400) / 20;
				if(this.buttonY < 400) this.buttonY = 400;
				game.ctx.drawImage(game.R["button_play"],this.buttonX,this.buttonY);
				//渲染鸟
				if(this.birdDirection == 1){
					this.birdY += 2;
					if(this.birdY > 330) this.birdDirection = -1;
		
				}else{
					this.birdY -= 2;
					if(this.birdY < 270) this.birdDirection = 1;
				}
				game.ctx.drawImage(game.R["bird0_0"],(game.canvas.width - 48) / 2,this.birdY)
				break;
			case 1:
				//渲染背景和大地
				game.ctx.fillStyle = "#4ec0ca";
				game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
				game.ctx.drawImage(game.R["bg_day"] , 0 , game.canvas.height - 512);
				game.ctx.drawImage(game.R["bg_day"] , 288 , game.canvas.height - 512);
				game.ctx.drawImage(game.R["land"] , 0 , game.canvas.height - 112);
				game.ctx.drawImage(game.R["land"] , 336 , game.canvas.height - 112);
				//渲染鸟
				game.ctx.drawImage(game.R["bird0_0"],game.canvas.width * (1-0.618),100);
				//渲染教程
				game.ctx.save();
				if(this.tutorialAlphaDirection == 1){
					this.tutorialAlpha += 0.1;
					if(this.tutorialAlpha >= 1) this.tutorialAlphaDirection = -1;
		
				}else{
					this.tutorialAlpha -= 0.1;
					if(this.tutorialAlpha < 0){
						this.tutorialAlpha = 0;
						this.tutorialAlphaDirection = 1;
					}
				}
				//改变透明度
				game.ctx.globalAlpha = this.tutorialAlpha;
				game.ctx.drawImage(game.R["tutorial"],(game.canvas.width   - 114 ) /2,300);
				game.ctx.restore();
				break;
			case 2:
				//渲染背景、大地、小鸟
				game.background.update();
				game.background.render();
				game.land.update();
				game.land.render();
				game.bird.update();
				game.bird.render();

				//每120帧实例化管子
				if(game.frame % 120 == 0){
					new Pipe();
				}

				//渲染所有管子
				for(var i = 0 ; i < game.pipeArr.length ; i++){
					game.pipeArr[i].update();
					game.pipeArr[i] &&  game.pipeArr[i].render();
				}

				scoreRender();
			 	
				break;
			case 3:
				//场景3的所有东西，不需要重新实例化
				game.background.render();
				game.land.render();
				for(var i = 0 ; i < game.pipeArr.length ; i++){
					game.pipeArr[i].render();
				}


				//如果没有爆炸中
				if(!this.showbomb){
					game.bird.render();
					//让小鸟落地
					game.bird.y+=16;
					if(game.bird.y > game.canvas.height - 112){
						//已经落地之后，渲染爆炸动画
						this.showbomb = true;
					}
				}else{
					//爆炸了
					game.ctx.drawImage(game.R["baozha" + this.baozha] , game.bird.x - 50, game.bird.y - 100, 100 ,100);
					game.frame % 3 == 0 && this.baozha++;
					if(this.baozha > 9){
						this.enter(4);
					}
				}

				scoreRender();

				break;
			case 4:
				//场景3的所有东西，不需要重新实例化
				game.background.render();
				game.land.render();
				for(var i = 0 ; i < game.pipeArr.length ; i++){
					game.pipeArr[i].render();
				}

				//gameover的y位置
				this.gameoverY += 10;
				if(this.gameoverY > 120){
					this.gameoverY = 120;
				}
				game.ctx.drawImage(game.R["text_game_over"],(game.canvas.width - 204) / 2,this.gameoverY)
 
				//颁奖
				this.score_panelY -= 10;
				if(this.score_panelY < 270){
					this.score_panelY = 270;
					this.showjiangpai = true;
				}
				game.ctx.drawImage(game.R["score_panel"],(game.canvas.width - 238) / 2,this.score_panelY)

				//显示奖牌
				if(this.showjiangpai){
					game.ctx.drawImage(game.R[this.model],(game.canvas.width / 2) - 88,this.score_panelY + 44)
					game.ctx.textAlign = "right";
					game.ctx.font = "20px consolas";
					game.ctx.fillStyle = "#333";
					game.ctx.fillText(game.score , (game.canvas.width / 2) + 93 , this.score_panelY + 50)
					game.ctx.fillText(this.best , (game.canvas.width / 2) + 93 , this.score_panelY + 96)
				
					game.ctx.drawImage(game.R["logo"], (game.canvas.width / 2 - 112) , 450);
				}

		}
	}
	SceneManager.prototype.bindEvent = function(){
		var self = this;
		game.canvas.onclick = function(e){
			var x = e.offsetX;
			var y = e.offsetY;

			switch(game.scene){
				case 0:
					//判断是否点击在了按钮身上
					if(x > self.buttonX && y > self.buttonY && x < self.buttonX + 116 && y < self.buttonY + 70){
						self.enter(1);
					}
					break;
				case 1:
					self.enter(2);
					break;
				case 2:
					game.bird.fly();
					break;
				case 3:
					break;
				case 4:
					self.enter(0);
					break;
			}
		}
	}


	function scoreRender(){
		//渲染分数
		//拆掉每一位
		var score = game.score.toString();
		//基准位置
		var baseX = game.canvas.width / 2 - (score.length / 2) * 30;
		for(var i = 0 ; i < score.length ; i++){
			var char = score[i];
			//渲染这一位，基准位置是
			game.ctx.drawImage(game.R["shuzi" + char] , baseX + i * 30,100);
		}
	}
})();