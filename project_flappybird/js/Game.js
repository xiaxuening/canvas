(function(){
	//游戏类
	var Game = window.Game = function(){
		//游戏类负责canvas元素
		this.canvas = document.getElementById("canvas");
		//上下文
		this.ctx = this.canvas.getContext("2d");
		//适配canvas的宽度和高度
		var windowW = document.documentElement.clientWidth;
		var windowH = document.documentElement.clientHeight;
		this.canvas.width = windowW <= 420 ? windowW : 420;
		this.canvas.height = windowW <= 750 ? windowH : 750;
		//场景编号
		this.scene = 0;	//欢迎界面、新手教学、游戏、GameOver
		//开辟本地存储
		if(!localStorage.getItem("flappybird")){
			localStorage.setItem("flappybird","[]");
		} 
		//加载资源
		var self = this;
		this.loadresouces(function(){
			self.start();
		});
	}
	Game.prototype.loadresouces = function(callback){
		//------------------------图片的加载------------------------
		this.R = {
			"bg_day" : "images/bg_day.png",
			"land" : "images/land.png",
			"pipe_down" : "images/pipe_down.png",
			"pipe_up" : "images/pipe_up.png",
			"bird0_0" : "images/bird0_0.png",
			"bird0_1" : "images/bird0_1.png",
			"bird0_2" : "images/bird0_2.png",
			"title" : "images/title.png",
			"button_play" : "images/button_play.png",
			"tutorial" : "images/tutorial.png",
			"shuzi0" : "images/font_048.png",
			"shuzi1" : "images/font_049.png",
			"shuzi2" : "images/font_050.png",
			"shuzi3" : "images/font_051.png",
			"shuzi4" : "images/font_052.png",
			"shuzi5" : "images/font_053.png",
			"shuzi6" : "images/font_054.png",
			"shuzi7" : "images/font_055.png",
			"shuzi8" : "images/font_056.png",
			"shuzi9" : "images/font_057.png",
			"baozha1" : "images/1.png",
			"baozha2" : "images/2.png",
			"baozha3" : "images/3.png",
			"baozha4" : "images/4.png",
			"baozha5" : "images/5.png",
			"baozha6" : "images/6.png",
			"baozha7" : "images/7.png",
			"baozha8" : "images/8.png",
			"baozha9" : "images/9.png",
			"text_game_over" : "images/text_game_over.png",
			"score_panel" : "images/score_panel.png",
			"medals_0" : "images/medals_0.png",
			"medals_1" : "images/medals_1.png",
			"medals_2" : "images/medals_2.png",
			"medals_3" : "images/medals_3.png",
			"logo" : "images/logo.png",
		}
		//加载器
		var count = 0;	//计数器
		var picAmount = Object.keys(this.R).length;	//图片总数
		//遍历
		for(var k in this.R){
			(function(self , src){
				self.R[k] = new Image();
				self.R[k].src = src;
				self.R[k].onload = function(){
					count++;
					self.clear();
					self.ctx.font = "30px 黑体";
					self.ctx.textAlign = "center";
					self.ctx.fillText("正在加载资源" + count + "/" + picAmount , self.canvas.width / 2 , 200);
					
					if(count == picAmount){
						//所有图片加载完毕，开始游戏！
						callback();
					}
				}
			})(this , this.R[k]);
		}
	}
	//清屏
	Game.prototype.clear = function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	//游戏开始
	Game.prototype.start = function(){
		//帧编号
		this.frame = 0;
		//设置字体和对齐
		this.ctx.font = "14px consolas";
		this.ctx.textAlign = "left";
		//实例化场景管理器
		this.sm = new SceneManager();
		//命令场景管理器进入场景0
		this.sm.enter(0);

		var self = this;
		this.timer = setInterval(function(){
			self.clear();
			//帧编号++
			self.frame++;
			//命令场景管理器渲染
			self.sm.updateAndRender();
			//显示帧编号
			self.ctx.fillStyle = "#333";
			self.ctx.textAlign = "left";
			game.ctx.font = "16px consolas";
			self.ctx.fillText("帧编号" + self.frame , 10 , 20);
			//显示场景编号
			self.ctx.fillText("场景号" + self.scene , 10 , 40);
 
		},20);
	}
})();