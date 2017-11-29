var Game = Class.extend({
    //构造函数
    init : function(id){
        //得到画布
        this.canvas = document.getElementById(id);
        //设置上下文
        this.ctx = this.canvas.getContext("2d");
        //自己的图片路径
        this.RtextURL = "R.txt";
        //自己的图片对象
        this.Robj = null;
        //自己timer
        this.timer = null;
        //自己的帧编号
        this.f = 0;
        //自己的图片空对象
        this.R = {};
        //自己演员数组
        this.actors = [];
        //自己的场景编号0开始 1游戏中 2结束
        this.enemys =[];

        this.sceneNum = 1;
        //加载资源方法
        this.loadResouces(
           function(){
             this.start();
           }
            // this.start()
        );
    },
    // 加载所有资源
    loadResouces : function(callback){
        var self = this;
        //加载资源的编号
        var count = 0;
        //提示用户正在加载资源
        self.ctx.font = "20px 微软雅黑";
        //canvas文字基线居中
        self.ctx.textAlign = "center";
        //往画布上写字
        self.ctx.fillText("正在加载资源...",self.canvas.width / 2 ,self.canvas.height * (1 - 0.618));
        $.get(self.RtextURL,function(date){
            self.Robj = JSON.parse(date);
            // 图片的总数
            var imagesAmount = _.size(self.Robj);
            // 循环便利这个对象，设置一个相似的图片Image()对象的JSON
            for(var k in self.Robj){
                //创建Image对象
                self.R[k] = new Image();
                //发出src请求
                self.R[k].src = self.Robj[k];
                //监听图片Loda事件
                self.R[k].onload = function(){
                    //    计数器加1
                    count++;
                    //    清屏
                    self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                    //    加载资源
                    self.ctx.fillText("正在加载图片" + count + "/" + imagesAmount , self.canvas.width / 2 , self.canvas.height * (1 - 0.618));
                    if(count == imagesAmount){
                        callback.call(self);
                    }
                }
            }
        })
    },
    start : function(){
        var self = this;
        this.scene = new Scene();
        this.scene.changeScene(this.sceneNum)
        this.timer = setInterval(function(){
            self.f++;
            //    先清屏
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            self.scene.show();

            //    渲染
            self.ctx.textAlign = "left";
            self.ctx.font = "14px Consolas";
            self.ctx.fillText("FNO：" + self.f , 15,15);
        },20);

    }
})